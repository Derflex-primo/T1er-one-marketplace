
export interface ProductDetailsProps {
    product: ProductTypes;
}

export interface ProductTypes {
    id: string;
    case?: "DROP" | "SELL" | "SWAP";
    name: string;
    description: string;
    type: PriceProps[];
    brand: string;
    category: string;
    images: ImageProps[];
    reviews?: ReviewProps[];
    quantity: number;
    selectedImg?: ImageProps | null;
}


export interface PriceProps {
    options: string;
    price: number;
}



export type ImageProps = {
    color: string;
    colorCode: string;
    image: string;
}

export interface ReviewProps {

    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
    createdDate: string;
    user: UserProps;
}

export interface UserProps {
    id: string;
    name: string;
    email: string;
    emailVerified: null | string;  // Assuming it could be null or a string
    image: string;
    hashedPassword: null | string; // Assuming it could be null or a string
    createdAt: string;
    updatedAt: string;
    role: string;
}




export interface IParams {
    productId?: string
}



export interface _InitProductsProps {
    data: ProductTypes;
    id: string;
}


export interface ImagePreviewProps {
    uploadedImages: string[];
    onDelete: (index: number) => void;
    imageColors: { color: string; name: string }[];
  }