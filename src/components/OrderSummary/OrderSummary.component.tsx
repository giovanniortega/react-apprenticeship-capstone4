import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";
import classes from "./OrderSummary.module.scss";

function OrderSummary() {
  const [totalOrder, setTotalOrder] = useState(0);
  const { store } = useContext(StoreContext);
  const { cartList } = store;

  useEffect(() => {
    let updatedTotalOrder = 0;

    cartList.forEach((product) => {
      updatedTotalOrder = updatedTotalOrder + product.productTotalPrice;
      setTotalOrder(+updatedTotalOrder.toFixed(2));
    });
  }, [cartList]);

  return (
    <div className={classes["summary-container"]}>
      <h2>Order summary</h2>
      <h3>
        Total order: <sup>$</sup>
        {totalOrder}
      </h3>
      <Link to="/checkout" className="cta cta-secondary mb-20">
        BUY
      </Link>
      <Link to="/products" className="cta">
        Check more products
      </Link>
    </div>
  );
}

export default OrderSummary;
