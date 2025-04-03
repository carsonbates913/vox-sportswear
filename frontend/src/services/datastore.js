/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore, collection, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, updateDoc, onSnapshot, query, where, serverTimestamp
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getAuth } from 'firebase/auth';

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
const db = getFirestore(app);
const storage = getStorage(app)
export const auth = getAuth(app);

export const initFirebase = () => {
    return app;
}

/* Returns all clothing data from database */
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

export async function getSpecificCartItem(userID, cartItemID){
  const reference = doc(db, "Users", userID, "Cart", cartItemID);
  const data = await getDoc(reference);
  return data;
}

export async function addToCart(userID, product, formData){
  const reference = collection(db, "Users", userID, "Cart");
  const cartItem = { 
    product,
    sizes: formData.sizes,
    color: formData.color,
    designNotes: formData.designNotes,
    imageURL: "",
  }
  console.log(cartItem);
  console.log(formData.file);
  const docRef = await addDoc(reference, cartItem);
  if(formData.file[0]){
    console.log("check");
    const url = await uploadImage(userID, formData.file[0]);
    await updateDoc(docRef, {imageURL: url});
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

export async function addOrder(userID, userEmail, items){
  const orderID = doc(collection(db, "Orders")).id;

  const orderItem = {
    userEmail,
    userID,
    items,
    status: "pending",
    date: serverTimestamp(),
  };

  const orderRef = doc(db, "Orders", orderID);
  const historyRef = doc(db, "Users", userID, "Order History", orderID);

  await setDoc(orderRef, orderItem);
  await setDoc(historyRef, orderItem);
}

export async function updateOrderStatus(userID, orderID, status){
  const reference = doc(db, "Users", userID, "Order History", orderID);
  await updateDoc(reference, {status});
}

export async function getUserData(userID){
  const reference = doc(db, "Users", userID);
  const data = await getDoc(reference);
  return data;
}

export function getOrders(callback = () => {}){
  const reference = collection (db, "Orders");
  const cancel = onSnapshot(reference, (snapshot) => {
    callback(snapshot);
  });
  return cancel;
}

export function getPreviousOrders(userID, callback = () => {}){
  const reference = collection(db, "Users", userID, "Order History");
  const cancel = onSnapshot(reference, (snapshot) => {
    callback(snapshot);
  })
  return cancel;
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