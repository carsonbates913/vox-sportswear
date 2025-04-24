/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {
  getFirestore, collection, doc, getDocs, deleteDoc, updateDoc, onSnapshot, query, where,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, updateMetadata } from "firebase/storage";
import { getAuth, getRedirectResult } from 'firebase/auth';
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
  measurementId: `${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const appCheck = initializeAppCheck(app, {provider: new ReCaptchaV3Provider('6LfpjRcrAAAAAC6y8bl0R5Q8ctKsNKQ7-Yz6_nSg'), isTokenAutoRefreshEnabled: true});
const db = getFirestore(app);
const storage = getStorage(app)
export const auth = getAuth(app);
    getRedirectResult(auth)
      .then((result) => {
        console.log("Redirect result:", result);
        if (result?.user) {
          //setUser(result.user);  // Store the user after redirect
        }
      })
      .catch((error) => {
        console.error("Error fetching redirect result:", error);
      });
export const functions = getFunctions(app);

export const initFirebase = () => {
    return app;
}

export async function getAllProducts(){
  const reference = collection(db, "Products");
  const data = await getDocs(reference);
  return data;
}

export async function getSpecificProduct(productName){
  const reference = collection(db, "Products");
  const q = query(reference, where("name", "==", productName));
  const data = await getDocs(q);
  return data;
}

export function getAllCart(userID, callback = () => {}){
  const reference = collection(db, "Users", userID, "Cart");
  const cancel = onSnapshot(reference, (snapshot) => {
    callback(snapshot);
  });
  return cancel; 
}

export async function uploadProduct(image){
  const newMetadata = {
    cacheControl: 'public,max-age=300',
  };
  console.log("hello");
  const imageRef = ref(storage, `products/DaliScreenshot2.png`); // Store under "products" folder
  try {
    await updateMetadata(imageRef, newMetadata);
  } catch (error ) {
    console.log(error);
  }
  console.log("clear");
}

export async function uploadImageToStorage(userID, cartItemID, image){
  console.log("bbb");
  if(!image || !cartItemID || !userID){
    console.log("oops");
    return;
  }
  const imageRef = ref(storage, `Users/${userID}/Cart/${image.name}`);
  const upload = await uploadBytes(imageRef, image);
  const url = await getDownloadURL(upload.ref);
  const cartItemRef = doc(db, "Users", userID, "Cart", cartItemID);
  await updateDoc(cartItemRef, {imageURL: url});
}

export async function deleteFromCart(userID, cartItemID, imageName) {
  const reference = doc(db, "Users", userID, "Cart", cartItemID);
  await deleteDoc(reference);
  if(imageName){
    await deleteImageFromStorage(userID, imageName);
  }
}

export function getOrders(callback = () => {}){
  const reference = collection (db, "Orders");
  const cancel = onSnapshot(reference, (snapshot) => {
    callback(snapshot);
  });
  return cancel;
}

export function getPreviousOrders(userID, callback = () => {}){
  const reference = collection(db, "Users", userID, "OrderHistory");
  const cancel = onSnapshot(reference, (snapshot) => {
    callback(snapshot);
  })
  return cancel;
}

async function deleteImageFromStorage(userID, imageName){
  const imageRef = ref(storage, `Users/${userID}/Cart/${imageName}`);
  await deleteObject(imageRef);
}