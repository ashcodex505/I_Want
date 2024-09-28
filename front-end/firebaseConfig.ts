// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import Firebase Auth service

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBOfGstYnCeygBEtFosMMmWr-fM1kev9E",
  authDomain: "hackathon-iwant.firebaseapp.com",
  projectId: "hackathon-iwant",
  storageBucket: "hackathon-iwant.appspot.com",
  messagingSenderId: "567999242638",
  appId: "1:567999242638:web:c2660d63d4baf763ac04df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
// Initialize Firebase Authentication and export it
const auth = getAuth(app); // This is the key step to ensure auth is initialized

export { app, auth , googleProvider}; // Export app and auth to use them in other parts of the app
