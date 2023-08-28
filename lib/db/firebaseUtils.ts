import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/init-firebase";
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
