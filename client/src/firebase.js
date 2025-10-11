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

// const ApiKey = import.meta.env.ApiKey
// const AuthDomain = import.meta.env.AuthDomain
// const ProjectId = import.meta.env.ProjectId
// const StorageBucket = import.meta.env.StorageBucket
// const MessagingSenderId = import.meta.env.MessagingSenderId
// const AppId = import.meta.env.AppId 

// const firebaseConfig = {
//   apiKey:ApiKey ,
//   authDomain:AuthDomain ,
//   projectId: ProjectId,
//   storageBucket: StorageBucket,
//   messagingSenderId: MessagingSenderId,
//   appId: AppId,
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);