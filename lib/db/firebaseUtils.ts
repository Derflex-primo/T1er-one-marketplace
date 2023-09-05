import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export const config = {
  firebaseConfig: {
      apiKey: "AIzaSyBjQzf93tOTrbcEEqtbtkKAz4-MolEvJOc",
      authDomain: "tier-one-4edec.firebaseapp.com",
      projectId: "tier-one-4edec",
      storageBucket: "tier-one-4edec.appspot.com",
      messagingSenderId: "462473217152",
      appId: "1:462473217152:web:865dab835f5a0038b91265",
      measurementId: "G-RD9VQCV8J6"
  },
}


export const app = initializeApp(config.firebaseConfig);
// Initilized Firestore
export const db = getFirestore(app);

import { collection, getDocs } from "firebase/firestore";
import { ProductTypes } from "@/types";

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
