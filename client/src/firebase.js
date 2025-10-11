import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const ApiKey = import.meta.env.VITE_ApiKey
const AuthDomain = import.meta.env.VITE_AuthDomain
const ProjectId = import.meta.env.VITE_ProjectId
const StorageBucket = import.meta.env.VITE_StorageBucket
const MessagingSenderId = import.meta.env.VITE_MessagingSenderId
const AppId = import.meta.env.VITE_AppId 

const firebaseConfig = {
  apiKey:ApiKey ,
  authDomain:AuthDomain ,
  projectId: ProjectId,
  storageBucket: StorageBucket,
  messagingSenderId: MessagingSenderId,
  appId: AppId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);