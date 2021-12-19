// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import "firebase/firestore";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "instagram-clone-2-ad87b.firebaseapp.com",
  projectId: "instagram-clone-2-ad87b",
  storageBucket: "gs://instagram-clone-2-ad87b.appspot.com",
  messagingSenderId: "48432320264",
  appId: "1:48432320264:web:7ebed56ff2314e05aea6bd",
};

// Initialize Firebase
const app = !getApps().lenght ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
