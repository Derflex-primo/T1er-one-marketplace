import { config } from "@/config/config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const app = initializeApp(config.firebaseConfig);
// Initilized Firestore
export const db = getFirestore(app);

