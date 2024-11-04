/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore, collection, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, updateDoc, onSnapshot
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKrqm1M6F3Zzp6uDTsqmV0wpCWxNgXa6c",
  authDomain: "vox-sportswear-b3355.firebaseapp.com",
  projectId: "vox-sportswear-b3355",
  storageBucket: "vox-sportswear-b3355.appspot.com",
  messagingSenderId: "483406817164",
  appId: "1:483406817164:web:65c9e00079ccae951f58a9",
  measurementId: "G-45Z989BFQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

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

export async function getAllCart(userID, callback = () => {}){
  const reference = collection(db, "Users", userID, "Cart");
  const cancel = onSnapshot(reference, (snapshot) => {
    callback(snapshot);
  });
  return cancel;
}

export async function addToCart(userID, productID, size){
  const reference = collection(db, "Users", userID, "Cart");
  const cartItem = { 
    productID: productID,
    size: size,
    quantity: 1
  }
  await addDoc(reference, cartItem);
}

export async function deleteFromCart(id) {
  const reference = doc(db,'Cart/' + id);
  await deleteDoc(reference);
}

export function updateCartQuantity(id, newQuantity) {
  const reference = doc(db, 'Cart/' + id);
  updateDoc(reference, {
    quantity: newQuantity
  })
}
