import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrHlHg7jzPAdf2cHC5MZv3o1O5OgLnBq4",
  authDomain: "stationhubproject.firebaseapp.com",
  projectId: "stationhubproject",
  storageBucket: "stationhubproject.firebasestorage.app",
  messagingSenderId: "522728415702",
  appId: "1:522728415702:web:633c3cfbc6a7ff6b3d0477",
  measurementId: "G-F08JKT8TKP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();