
export interface ProductDetailsProps {
    product: ProductTypes;
    cartProduct?: ProductTypes
}


export type ProductMapType = {
    [key: string]: ProductTypes
  };
  

export interface ProductTypes {
    id: string;
    case?: "DROP" | "SELL" | "SWAP";
    name: string;
    description: string;
    type: PriceProps[];
    brand: string;
    category: string;
    images: ImageProps[];
    vidAd?: VideoAdProps;
    reviews?: ReviewProps[];
    quantity: number;
    selectedImg?: ImageProps | null;
    specs?: ProductSpecs;
    deal?: string;
    logistics?: string;
    store?: StoreProps
    addedBy?: UserAuthProps | null;


}

export interface CartProduct extends ProductTypes {
    cartItemId: string; // This is the new property for the unique identifier
  }
  

export interface ProductSpecs {
    [key: string]: string;
}

 

export interface PriceProps {
    options: string;
    price: number;
}



export type ImageProps = {
    color?: string;
    colorCode?: string;
    image?: string;
    setImages: string[];
}


export interface VideoAdProps {
    videoAd?: string ;
    onDelete?: () => void;
} 

export interface ReviewProps {

    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
    createdDate: string;
    user: UserAuthProps;
}

export interface UserAuthProps {
    id: string;
    name: string;
    email: string;
    emailVerified: null | string;   
    image: string;
    phoneNumber: string;
    addedTime: string;
    updatedAt: string;
    role: string;
}


export interface StoreProps {
    storeName: string
    storeAddress: string;
}



export interface IParams {
    productId?: string
}



export interface _InitProductsProps {
    data: ProductTypes;
    id: string;
}

interface ImageColor {
    name: string;
    color: string;
  }


export interface ImagePreviewProps {
    uploadedImages: string[];
    onDelete: (index: number) => void;
    imageColors: ImageColor[];
    imagesInGroups: ImageProps[];
    addImageToGroup: (index: number, imageUrl: string) => void;
  }


//---------------------------Category Types

export type CategoryType = "smart phones" | "laptops" | "cameras" | "camera lens" | "wired headphones" | "wireless headphones" | "cords" | "accessories" | "microphone" | "chips" | "desktop" | "tablet" | "monitor" | "external hard drives" | "memory cards" | "routers" | "modems" | "network switches" | "printer" | "scanner" | "gaming consoles" | "gaming accessories" | "software" | "office furniture" | "server equipment" | "diy electronics" | "drones" | "virtual reality" | "smartwatches" | "fitness trackers" | "e readers" | "projectors" | "televisions" | "car tech" | "home automation";

export interface SpecsCategoriesProps {
  category: CategoryType | string;
  onSpecsChange: (specs: SpecsProps) => void;
}


export interface SpecsProps {
    [key: string]: string;
}


export interface ItemSpecsRefProps {
    specs: SpecsProps;   
    onSpecsChange: (newSpecs: SpecsProps) => void;  
  }
  

export interface ItemSpecsRef {
    getSpecs: () => Record<string, string>;
}


// Browse logic types

export interface BrowseProps {
    products: ProductTypes[];
}



// Wallet


export type PurchaseItem = {
    name: string;
    price: number;
  };

export type UserPurchasesState = {
    items: PurchaseItem[];
    totalSpent: number;
  };