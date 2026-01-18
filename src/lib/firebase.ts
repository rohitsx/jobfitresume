import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzBcpItmm51Pr6qaNVOC4cF65tt6M_Pm8",
  authDomain: "jobfitresume0.firebaseapp.com",
  projectId: "jobfitresume0",
  storageBucket: "jobfitresume0.firebasestorage.app",
  messagingSenderId: "439316927747",
  appId: "1:439316927747:web:c2813e3d08a65cd8114536",
  measurementId: "G-N8VMWK8Z1G",
  databaseURL: "https://jobfitresume0-default-rtdb.asia-southeast1.firebasedatabase.app/"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app as FirebaseApp, auth };
