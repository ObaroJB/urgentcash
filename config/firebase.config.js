// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: ProcessingInstruction.ENV.FIREBASE_API_KEY,
  authDomain: "urgentcash-1ffc8.firebaseapp.com",
  projectId: "urgentcash-1ffc8",
  storageBucket: "urgentcash-1ffc8.firebasestorage.app",
  messagingSenderId: "828142571559",
  appId: "1:828142571559:web:310ec94d50ab596c52be02"
};

// Initialize Firebase
const app = getApps().length == 0 ? initializeApp(firebaseConfig):getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage}