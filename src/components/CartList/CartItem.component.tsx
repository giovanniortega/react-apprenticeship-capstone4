import { useContext } from "react";
import { StoreContext } from "../../store/StoreContext";
import { productToCartType } from "../../types/types";
import { FaTrashAlt } from "react-icons/fa";
import classes from "./CartItem.module.scss";

interface CartItemPropsType {
  cartProduct: productToCartType;
}

function CartItem({ cartProduct }: CartItemPropsType) {
  const { store, dispatch } = useContext(StoreContext);
  const { cartList } = store;

  const actionItem = (action: string) => {
    let updatedCartList = cartList;

    cartList.forEach((product, index) => {
      if (product.productData.id === cartProduct.productData.id) {
        if (action === "ADD_ITEM") {
          if (product.productsAmount < cartProduct.productData.data.stock) {
            const updatedProductAmount =
              updatedCartList[index].productsAmount + 1;
            const updatedProductTotalPrice =
              updatedProductAmount *
              updatedCartList[index].productData.data.price;
            updatedCartList[index].productsAmount = updatedProductAmount;
            updatedCartList[index].productTotalPrice = updatedProductTotalPrice;
          }
        }

        if (action === "REMOVE_ITEM") {
          if (product.productsAmount > 1) {
            const updatedProductAmount =
              updatedCartList[index].productsAmount - 1;
            const updatedProductTotalPrice =
              updatedProductAmount *
              updatedCartList[index].productData.data.price;
            updatedCartList[index].productsAmount = updatedProductAmount;
            updatedCartList[index].productTotalPrice = updatedProductTotalPrice;
          }
        }

        if (action === "DELETE_PRODUCT") {
          updatedCartList.splice(index, 1);
        }
      }

      window.localStorage.setItem(
        "FurnituresSiteCart",
        JSON.stringify(updatedCartList)
      );

      dispatch({ type: "setCartList", payload: updatedCartList });
    });
  };

  return (
    <div className={classes["cart-product"]}>
      <div className={classes["product-poster"]}>
        <img
          src={cartProduct.productData.data.mainimage.url}
          alt={cartProduct.productData.data.mainimage.alt}
        />
      </div>
      <div className={classes["product-data"]}>
        <div className={classes["product-info"]}>
          <h3>{cartProduct.productData.data.name}</h3>
          <p>
            <b>Price:</b> <sup>$</sup>
            {cartProduct.productData.data.price}
          </p>
        </div>
        <div className={classes["product-summary"]}>
          <div className={classes["product-actions"]}>
            <b>Amount:</b>
            <button
              type="button"
              className={classes["counter-cta"]}
              onClick={() => actionItem("REMOVE_ITEM")}
              disabled={cartProduct.productsAmount === 1}
            >
              -
            </button>
            <span className={classes["item-counter"]}>
              {cartProduct.productsAmount}
            </span>
            <button
              type="button"
              className={classes["counter-cta"]}
              onClick={() => actionItem("ADD_ITEM")}
              disabled={
                cartProduct.productsAmount ===
                cartProduct.productData.data.stock
              }
            >
              +
            </button>
          </div>
          <p>
            <b>Total:</b> <sup>$</sup>
            {cartProduct.productData.data.price * cartProduct.productsAmount}
          </p>
          <button
            type="button"
            className="cta cta-secondary"
            onClick={() => actionItem("DELETE_PRODUCT")}
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
