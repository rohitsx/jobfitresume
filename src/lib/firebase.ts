import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPgVqVX6HtgW6IOB9LaCODcUUYwq7t9-c",
  authDomain: "jobfitresume-auth.firebaseapp.com",
  projectId: "jobfitresume-auth",
  storageBucket: "jobfitresume-auth.firebasestorage.app",
  messagingSenderId: "92083094969",
  appId: "1:92083094969:web:346017e7c98dcafc852268",
  measurementId: "G-MNPWYB7800",
  databaseURL: "https://jobfitresume-auth-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app as FirebaseApp, auth };
