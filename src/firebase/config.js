import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBBTUl5IJR_hrpKw52Zy5toU4YJChzxOCQ",
  authDomain: "project-cost-tracker-app.firebaseapp.com",
  projectId: "project-cost-tracker-app",
  storageBucket: "project-cost-tracker-app.firebasestorage.app",
  messagingSenderId: "588465703768",
  appId: "1:588465703768:web:faeff3edc8f5658478f32d",
  measurementId: "G-0GGRE3EH81"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
