/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore, collection, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, updateDoc, onSnapshot
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import dotenv from "dotenv"

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app)

export const initFirebase = () => {
    return app;
}

/* Returns all clothing data from database */
export async function getAllProducts(){
  const reference = collection(db, "Products");
  const data = await getDocs(reference);
  return data;
}

export async function getSpecificProduct(productID){
  const reference = doc(db, "Products", productID);
  const data = await getDoc(reference);
  return data;
}

export function getAllCart(userID, callback = () => {}){
  const reference = collection(db, "Users", userID, "Cart");
  const cancel = onSnapshot(reference, (snapshot) => {
    callback(snapshot);
  });
  return cancel; 
}

export async function getSpecificCartItem(userID, cartItemID){
  const reference = doc(db, "Users", userID, "Cart", cartItemID);
  const data = await getDoc(reference);
  return data;
}

export async function addToCart(userID, productID, formData){
  const reference = collection(db, "Users", userID, "Cart");
  const cartItem = { 
    productID,
    size: formData.size,
    color: formData.color,
    customization: formData.customization,
    quantity: 1,
    imageURL: null,
    imageName: null,
  }
  const docRef = await addDoc(reference, cartItem);
  if(formData.image){
    const url = await uploadImage(userID, formData.image);
    await updateDoc(docRef, {imageURL: url, imageName: formData.image.name});
  }
}

export async function deleteFromCart(userID, cartItemID, imageName) {
  const reference = doc(db, "Users", userID, "Cart", cartItemID);
  await deleteDoc(reference);
  if(imageName){
    console.log(imageName);
    await deleteImageFromStorage(userID, imageName);
  }
}

export async function updateCartQuantity(userID, cartItemID, newQuantity) {
  const reference = doc(db, "Users", userID, "Cart", cartItemID);
  await updateDoc(reference, {
    quantity: newQuantity
  })
}

export async function addOrder(userID, userEmail, items){
  const orderReference = collection(db, "Orders");
  const orderItem = {
    userEmail,
    items,
  }
  await addDoc(orderReference, orderItem);

  const historyReference = collection(db, "Users", userID, "Order History");
  await addDoc(historyReference, orderItem);
}

export async function getUserData(userID){
  const reference = doc(db, "Users", userID);
  const data = await getDoc(reference);
  return data;
}

export async function getOrders(callback = () => {}){
  const reference = collection (db, "Orders");
  const cancel = onSnapshot(reference, (snapshot) => {
    callback(snapshot);
  })
}

async function uploadImage(userID, image) {
  if(!image){
    return;
  }
  const imageRef = ref(storage, `Users/${userID}/Cart/${image.name}`);
  const upload = await uploadBytes(imageRef, image);
  const url = await getDownloadURL(upload.ref);
  return url;
}

async function deleteImageFromStorage(userID, imageName){
  const imageRef = ref(storage, `Users/${userID}/Cart/${imageName}`);
  await deleteObject(imageRef);
}