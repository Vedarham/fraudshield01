import axios from 'axios';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const API_URL = 'http://localhost:5000/api';

export const getAlerts = async () => {
  const response = await axios.get(`${API_URL}/alert`);
  return response.data;
};

export const getReports = async () => {
  const response = await axios.get(`${API_URL}/reports`);
  return response.data;
};

export const submitReport = async (reportData) => {
  const response = await axios.post(`${API_URL}/report`, reportData);
  return response;
};

export const scanContent = async (text) => {
  const response = await axios.post(`${API_URL}/scan`, { text });
  return response.data;
};

export const getUserProfile = async (userId) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

export const updateUserProfile = async (userId, data) => {
  const docRef = doc(db, 'users', userId);
  await setDoc(docRef, data, { merge: true });
};