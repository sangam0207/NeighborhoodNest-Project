// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY, // import from env file ( keep it private )
  authDomain: "mern-ssestate.firebaseapp.com",
  projectId: "mern-ssestate",
  storageBucket: "mern-ssestate.appspot.com",
  messagingSenderId: "818651035724",
  appId: "1:818651035724:web:a43d4b8767da60fb569ce9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);