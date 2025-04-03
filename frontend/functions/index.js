// ====================
// Environment Setup
// ====================

import functions from "firebase-functions";
import admin from "firebase-admin";
import sgMail from "@sendgrid/mail";

// Initialize Firebase SDK, Sendgrid
const app = admin.initializeApp();
const db = admin.firestore(app);
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

export const sendOrderResponse = functions.https.onRequest(
    {cors: true},
    async (req, res) => {
      const {submitType, consumerID, consumerEmail, price, message,
        orderID} = req.body;
      const batch = db.batch();
      try {
        // Handle "decline" case
        if (submitType === "decline") {
          const body = `Your order request has been denied. Notes: ${message}`;
          await sendEmail(consumerEmail, body);
          console.log(consumerEmail);
          console.log(orderID);
          console.log(consumerID);
          const orderRef = db.collection("Orders").doc(orderID);
          batch.delete(orderRef);
          const userOrderRef = db.collection("Users").
              doc(consumerID).collection("Order History").doc(orderID);
          batch.update(userOrderRef, {status: "declined"});
          await batch.commit();
          return res.status(200).send("Order declined");
        }

        // Handle "accept" case
        const body = `
          Your order of price ${price} has been approved! Notes: ${message}`;
        await sendEmail(consumerEmail, body);

        const orderRef = db.collection("Orders").doc(orderID);
        batch.delete(orderRef);
        const userOrderRef = db.collection("Users").
            doc(consumerID).collection("Order History").doc(orderID);
        batch.update(userOrderRef, {status: "accepted"});
        await batch.commit();
        res.status(200).send("Successfuly did something!");
      } catch (error) {
        console.error("Error - ", {
          error: error.message,
          stack: error.stack,
          input: {
            submitType: req.body.submitType,
            consumerEmail: req.body.consumerEmail,
            price: req.body.price,
            message: req.body.message,
            orderID: req.body.orderID,
          },
        });
        res.status(500).send("Unable to send order response");
      }
    });
