// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "urgentcash01.firebaseapp.com",
  projectId: "urgentcash01",
  storageBucket: "urgentcash01.firebasestorage.app",
  messagingSenderId: "227920179535",
  appId: "1:227920179535:web:1c119735f2d720532e553a"
};

// Initialize Firebase
const app = getApps().length == 0 ? initializeApp(firebaseConfig):getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage}