import CartItem from "./CartItem.component";
import { productToCartType } from "../../types/types";

interface CartListPropsType {
  cartProducts: productToCartType[];
}

function CartList({ cartProducts }: CartListPropsType) {
  return (
    <div>
      <div className="section-title">
        <h3>Shopping Cart ({cartProducts.length})</h3>
      </div>
      {cartProducts.length > 0 &&
        cartProducts.map((product) => (
          <CartItem cartProduct={product} key={product.productData.id} />
        ))}
    </div>
  );
}

export default CartList;
