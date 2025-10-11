import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIj2foIX9Uqs8uMZR6sWVvy65ExV5M37g",
  authDomain: "fraudshield-bcdd7.firebaseapp.com",
  projectId: "fraudshield-bcdd7",
  storageBucket: "fraudshield-bcdd7.firebasestorage.app",
  messagingSenderId: "831137596029",
  appId: "1:831137596029:web:3443280621abad8248e714"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);