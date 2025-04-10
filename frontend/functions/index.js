// ====================
// Environment Setup
// ====================

import functions from "firebase-functions";
import admin from "firebase-admin";

import sgMail from "@sendgrid/mail";

// Initialize Firebase SDK
const app = admin.initializeApp();
const db = admin.firestore(app);

const maxRequests = 5;

/*
const uid = "USER_UID"; // The Firebase UID of the user you want to make admin

admin.auth().setCustomUserClaims(uid, {isAdmin: true})
    .then(() => {
      console.log(`Custom claim set for user ${uid}`);
    })
    .catch((error) => {
      console.error("Error setting custom claims:", error);
    });
*/

// Initialize Sendgrid
sgMail.setApiKey(process.env.TWILIO_KEY);

const sendEmail = async (to, body) => {
  const msg = {
    to: to,
    from: "carson.d.bates.27@dartmouth.edu",
    subject: "Vox Sportswear Order",
    text: body,
  };
  await sgMail.send(msg);
};

export const addOrder = functions.runWith({
  enforceAppCheck: true,
}).https.onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be signed in");
  }

  const userID = request.auth.uid;
  const userEmail = request.auth.token.email;
  const items = request.data;

  if (!Array.isArray(items) || items.length === 0 ) {
    throw new functions.https.HttpsError("invalid-argument", "No items provided");
  }

  if (items.length > 20 ) {
    throw new functions.https.HttpsError("invalid-argument", "Too many items");
  }

  const now = admin.firestore.Timestamp.now();
  const startOfDay = admin.firestore.Timestamp.fromDate(new Date(now.toDate().getFullYear(), now.toDate().getMonth(), now.toDate().getDate(), 0, 0, 0, 0));

  const previousOrdersRef = db.collection("Users").doc(userID).collection("OrderHistory");
  const previousOrdersSnapshot = await previousOrdersRef.where("date", ">=", startOfDay).get();
  if (previousOrdersSnapshot.size >= maxRequests) {
    throw new functions.https.HttpsError("resource-exhausted", "Too many requests");
  }

  const orderRef = db.collection("Orders").doc();
  const historyRef = db.collection("Users").doc(userID).collection("OrderHistory").doc(orderRef.id);
  const cartRef = db.collection("Users").doc(userID).collection("Cart");
  const cartSnapshot = await cartRef.get();

  const orderData = {
    userEmail,
    userID,
    items,
    status: "pending",
    date: admin.firestore.FieldValue.serverTimestamp(),
  };

  const batch = db.batch();
  cartSnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  batch.set(orderRef, orderData);
  batch.set(historyRef, orderData);
  await batch.commit();

  return {success: true, orderID: orderRef.id};
});

export const addToCart = functions.https.onCall(async (request) => {
  console.log("auth", request);
  if (!request.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be signed in");
  }

  const userID = request.auth.uid;

  const {product, sizes, color, designNotes} = request.data;

  if (!product || !sizes || !color) {
    throw new functions.https.HttpsError("invalid-argument", "Missing required fields.");
  }

  const cartRef = db.collection("Users").doc(userID).collection("Cart");
  const cartSnapshot = await cartRef.get();

  if (cartSnapshot.size >= 20) {
    throw new functions.https.HttpsError("resource-exhausted", "Cart already has 20 items.");
  }

  const cartItem = {
    product,
    sizes,
    color,
    designNotes: designNotes || "",
    imageURL: "",
  };

  const docRef = await cartRef.add(cartItem);

  return {success: true, docId: docRef.id};
});

export const sendOrderResponse = functions.https.onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be signed in");
  }

  if (!request.auth.token.isAdmin) {
    throw new functions.https.HttpsError("permission-denied", "User must be admin");
  }

  const {submitType, consumerID, consumerEmail, price, message, orderID} = request.data;

  if (!submitType || !consumerID || !consumerEmail || !price || !message || !orderID) {
    throw new functions.https.HttpsError("invalid-argument", "Missing required fields.");
  }

  const batch = db.batch();

  try {
    // Handle "decline" case
    if (submitType === "decline") {
      const body = `Your order request has been denied. Notes: ${message}`;
      await sendEmail(consumerEmail, body);

      const orderRef = db.collection("Orders").doc(orderID);
      batch.delete(orderRef);

      const userOrderRef = db.collection("Users").doc(consumerID).collection("OrderHistory").doc(orderID);
      batch.update(userOrderRef, {status: "declined"});

      await batch.commit();
      return {message: "Order declined"};
    }

    // Handle "accept"
    const body = `Your order of price ${price} has been approved! Notes: ${message}`;
    await sendEmail(consumerEmail, body);

    const orderRef = db.collection("Orders").doc(orderID);
    batch.delete(orderRef);

    const userOrderRef = db.collection("Users").doc(consumerID).collection("OrderHistory").doc(orderID);
    batch.update(userOrderRef, {status: "accepted"});

    await batch.commit();
    return {message: "Order accepted"};
  } catch (error) {
    console.error("sendOrderResponse error:", {
      error: error.message,
      stack: error.stack,
      input: request.data,
    });
    throw new functions.https.HttpsError("internal", "Unable to send order response");
  }
});
