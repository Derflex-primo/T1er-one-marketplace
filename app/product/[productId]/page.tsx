
import Container from "@/app/components/Container"
import ProductDetails from "@/app/components/products/ProductDetails"
import ListRating from "@/app/components/products/ListRating"
import { products } from "@/utils/products"

interface IParams {
    productId?: string
}


const Product = ({ params }: { params: IParams }) => {
  const product = products.find((item) => item.id === params.productId)
  return (
    <div className="p-8">
     <Container>
       <ProductDetails product={product} />
       <div className="flex flex-col  mt-8 gap-32">
         <div>Add rating</div>
         <ListRating product={product}/>
       </div>
     </Container>
    </div>
  )
}

export default Product;