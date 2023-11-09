import Container from "../components/Container"
import CartClient from "./CartClient"

 
// LACK ON DEALS VOUCHER 

const Cart = () => {
  return (
    <div className="pt-8">
      <Container>
        <CartClient />
      </Container>
    </div>
  )
}

export default Cart