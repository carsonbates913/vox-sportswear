/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import functions from "firebase-functions";
import admin from "firebase-admin";

export const createFirstAdmin = functions.https.onRequest(async (req, res) => {
  admin.initializeApp();
  const email = "carson.d.bates.27@dartmouth.edu";

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, {isAdmin: true});
    res.status(200).send(`Successfully created first admin role to ${email}`);
    console.log("worked");
  } catch (error) {
    console.error("failed to add first admin:", error);
    res.status(500).send("Failed to assign admin role. Check logs for details");
  }
});

export const sendOrderResponse = functions.https.onRequest(
    {cors: true},
    async (req, res) => {
      try {
        // const {price, msg} = JSON.parse(req.body);
        res.status(200).send("Successfuly did somethinggg!");
      } catch (error) {
        console.error("Error - ", error);
        res.status(500).send("Unable to send order response");
      }
    });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
