import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { ProductTypes } from "@/types";
import validatedEnv from "../utils/env";

export const config = {
  firebaseConfig: {
    apiKey: validatedEnv.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: validatedEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: validatedEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: validatedEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: validatedEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: validatedEnv.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: validatedEnv.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
