// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjQzf93tOTrbcEEqtbtkKAz4-MolEvJOc",
  authDomain: "tier-one-4edec.firebaseapp.com",
  projectId: "tier-one-4edec",
  storageBucket: "tier-one-4edec.appspot.com",
  messagingSenderId: "462473217152",
  appId: "1:462473217152:web:865dab835f5a0038b91265",
  measurementId: "G-RD9VQCV8J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);