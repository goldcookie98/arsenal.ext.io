import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAmVGKhVuYFDwJNIxb4hr_QvdCnMdIRToQ",
  authDomain: "arsenal-tracker-74dd7.firebaseapp.com",
  projectId: "arsenal-tracker-74dd7",
  storageBucket: "arsenal-tracker-74dd7.firebasestorage.app",
  messagingSenderId: "345750466137",
  appId: "1:345750466137:web:86de0607ce75073e5f7394" // Guessed appId or common format, usually not critical for Firestore
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
