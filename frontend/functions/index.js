// ====================
// Environment Setup
// ====================

import functions from "firebase-functions";
import admin from "firebase-admin";
import sgMail from "@sendgrid/mail";
import crypto from "crypto";

// Initialize Firebase SDK, Sendgrid, and PayPal
const app = admin.initializeApp();
const db = admin.firestore(app);
sgMail.setApiKey(process.env.TWILIO_KEY);
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const endURL = "https://api-m.sandbox.paypal.com";

/**
 * Generates a required access token to access PayPal's endpoints
 * @return {data} the access token
 */
async function generateAccessToken() {
  const response = await fetch(endURL + "/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":
      "Basic " + Buffer
          .from(clientID + ":" + clientSecret).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });
  if (response.ok) {
    const data = await response.json();
    return data.access_token;
  } else {
    const errorResponse = response.json();
    throw new Error(`Access token error! ${response.status} - 
      ${response.statusText} - ${errorResponse}`);
  }
}

const createOrder = async (price) => {
  const accessToken = await generateAccessToken();
  const data = JSON.stringify({
    "intent": "CAPTURE",
    "purchase_units": [{
      "amount": {
        "currency_code": "USD",
        "value": `${price}`,
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
          "cancel_url": "https://vox-sportswear-b3355.web.app/mycart", // Add cancel URL here
        },
      },
    },
  });

  return await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Paypal-Request-Id": crypto.randomUUID(),
      "Authorization": `Bearer ${accessToken}`,
    },
    body: data,
  });
};

const sendEmail = async (to, body) => {
  const msg = {
    to: to,
    from: "carson.d.bates.27@dartmouth.edu",
    subject: "Vox Sportswear Order",
    text: body,
  };
  await sgMail.send(msg);
};

/**
 * Sends an email response containing a payment link
 *  or decline message to the address of the consumer
 * @param {string} submitType - the type of submit (e.g. accept (pay), decline)
 */
export const sendOrderResponse = functions.https.onRequest(
    {cors: true},
    async (req, res) => {
      try {
        const {submitType, consumerEmail, price, message, orderID} = req.body;

        // Handle "decline" case
        if (submitType === "decline") {
          const body = `Your order request has been denied. Notes: ${message}`;
          sendEmail(consumerEmail, body);
          await db.collection("Orders").doc(orderID).delete();
          return res.status(200).send("Order declined");
        }

        // validate correct price
        if (isNaN(price) || price.trim() === "" ||
         Number(price).toFixed(2) !== price) {
          throw new Error(`Invalid price format - 
          must be two decimal places (e.g. 20.00)`);
        }

        // Handle "accept" case
        const response = await createOrder(price);
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(`HTTP error! Status: 
            ${response.status} - ${response.statusText} - 
            ${JSON.stringify(errorResponse)}`);
        }

        const data = await response.json();
        const approveLink = data.links.find(
            (link) => link.rel === "payer-action");
        if (!approveLink) {
          throw new Error("Payment error! could not find approve link");
        }

        const body = `
          Your order of price ${price} has been approved!
          Please proceed to the payment link to complete your purchase. 
          Notes: ${message}
          Payment Link: ${approveLink.href}
        `;
        await sendEmail(consumerEmail, body);

        await db.collection("Orders").doc(orderID).delete();
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

/**
 * confirms the order payment and redirects user
 * @param {string} orderID - ID of the order to confirm
 */
export const confirmOrder = functions.https.onRequest(async (req, res) => {
  try {
    const orderID = req.query.token;
    const accessToken = await generateAccessToken();

    const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Paypal-Request-Id": crypto.randomUUID(),
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    if (data.status === "COMPLETED") {
      res.redirect("https://www.google.com/");
    } else {
      res.redirect("https://www.google.com/");
    }
  } catch (error) {
    console.error("Error - ", {
      error: error.message,
      stack: error.stack,
    });
    res.redirect("https://www.google.com/");
  }
});
