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
import sgMail from "@sendgrid/mail";
import crypto from "crypto";
const app = admin.initializeApp();
const db = admin.firestore(app);
sgMail.setApiKey(process.env.TWILIO_KEY);

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const endURL = "https://api-m.sandbox.paypal.com";

/**
 * Generates a required access token to use PayPal's endpoints
 * @return {data} the access token
 */
async function generateAccessToken() {
  const by = "grant_type=client_credentials";
  const response = await fetch(endURL + "/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":
      "Basic " + Buffer
          .from(clientID + ":" + clientSecret).toString("base64"),
    },
    body: by,
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data.access_token);
    return data.access_token;
  } else {
    throw new Error("Access token error!");
  }
}

export const sendOrderResponse = functions.https.onRequest(
    {cors: true},
    async (req, res) => {
      try {
        const {submitType, recipientEmail, price, message, orderID} = req.body;
        if (submitType==="accept") {
          const accessToken = await generateAccessToken();
          const order = {
            "intent": "CAPTURE",
            "purchase_units": [{
              "amount": {
                "currency_code": "USD",
                "value": `100.00`,
              },
            }],
            "payment_source": {
              "paypal": {
                "experience_context": {
                  "brand_name": "Vox-Sportswear",
                  "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
                  "landing_page": "LOGIN",
                  "shipping_preference": "GET_FROM_FILE",
                  "user_action": "PAY_NOW",
                  "locale": "en-US",
                  "return_url": "https://confirmorder-ffshwcchqq-uc.a.run.app", // Add return URL here
                  "cancel_url": "https://example.com/cancel", // Add cancel URL here
                },
              },
            },
          };
          const data = JSON.stringify(order);

          const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Paypal-Request-Id": crypto.randomUUID(),
              "Authorization": `Bearer ${accessToken}`,
            },
            body: data,
          });

          if (response.ok) {
            const data = await response.json();
            const approveLink = data.links.find(
                (link) => link.rel === "payer-action");
            if (approveLink) {
              const msg = {
                to: `${recipientEmail}`,
                from: "carson.d.bates.27@dartmouth.edu",
                subject: "Test Test",
                text: `price: ${price}, message: 
                ${message + ` Payment Link: ${approveLink.href}`}`,
              };
              await sgMail.send(msg);
              await db.collection("Orders").doc(orderID).delete();
              res.status(200).send("Successfuly did something!");
            } else {
              throw new Error("Payment error! could not find approve link");
            }
          } else {
            const errorResponse = await response.json();
            throw new Error(`HTTP error! Status: 
              ${response.status} - ${response.statusText} - 
              ${JSON.stringify(errorResponse)}`);
          }
        } else if (submitType==="decline") {
          const msg = {
            to: `${recipientEmail}`,
            from: "carson.d.bates.27@dartmouth.edu",
            subject: "Test Test",
            text: `${message}`,
          };
          await sgMail.send(msg);
          await db.collection("Orders").doc(orderID).delete();
        }
      } catch (error) {
        console.error("Error - ", error);
        res.status(500).send("Unable to send order response");
      }
    });

export const confirmOrder = functions.https.onRequest(async (req, res) => {
  try {
    const orderID = req.query.token;
    const accessToken = await generateAccessToken();
    console.log("check");
    console.log(orderID);

    const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Paypal-Request-Id": crypto.randomUUID(),
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data.status);

    if (data.status === "COMPLETED") {
      res.redirect("https://www.google.com/");
    } else {
      res.redirect("https://www.google.com/");
    }
  } catch (error) {
    console.error("Error - ", error);
    res.redirect("https://www.google.com/");
  }
});
