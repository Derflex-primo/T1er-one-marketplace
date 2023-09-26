import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { ProductTypes } from "@/types";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const FIREBASE_MEASUREMENT_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

export const config = {
  firebaseConfig: {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
  }
};



export const app = initializeApp(config.firebaseConfig);
// Initilized Firestore
export const db = getFirestore(app);
export const getProductsFromFirebase = async (): Promise<ProductTypes[]> => {
  try {
    const productCollectionRef = collection(db, "products");
    const response = await getDocs(productCollectionRef);
    return response.docs.map((doc) => {
      const productData = doc.data() as ProductTypes;
      return {
        ...productData, // Spread the properties of productData directly
        id: doc.id,
      };
    });
  } catch (error) {
    console.error("Failed to fetch products: ", error);
    throw new Error("Failed to fetch products");
  }
};
