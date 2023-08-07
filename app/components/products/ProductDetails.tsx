"use client" 

interface ProductDetailsProps {
    product: any
}

const productDetails = "grid grid-cols-1 md:grid-cols-2 gap-12"
const ProductDetails:React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className={productDetails}>
    <div>Images</div>
    <div>Products</div>
    </div>
  )
}

export default ProductDetails