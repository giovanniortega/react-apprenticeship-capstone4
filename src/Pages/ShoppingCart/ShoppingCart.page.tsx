import { useContext } from "react";
import { StoreContext } from "../../store/StoreContext";
import CartList from "../../components/CartList/CartList.component";
import OrderSummary from "../../components/OrderSummary/OrderSummary.component";
import classes from "./ShoppingCart.module.scss";

function ShoppingCart() {
  const { store } = useContext(StoreContext);
  const { cartList } = store;

  return (
    <div className="content-container">
      <div className={classes["product-container"]}>
        <div className={classes["container-left"]}>
          {cartList.length > 0 && <CartList cartProducts={cartList} />}
        </div>
        <div className={classes["container-right"]}>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
