import { useContext } from "react";
import { StoreContext } from "../../store/StoreContext";
import { useState } from "react";
import { ProductDataType, productToCartType } from "../../types/types";
import classes from "./ProductDetailInfo.module.scss";

interface ProductDetailInfoType {
  detailInfo: ProductDataType;
}

function ProductDetailInfo({ detailInfo }: ProductDetailInfoType) {
  const { dispatch } = useContext(StoreContext);
  const [productsAmonunt, setProductsAmount] = useState<number>(1);
  const [productStock, setProductStock] = useState<number>(
    detailInfo.data.stock - productsAmonunt
  );

  const addItesmToCart = () => {
    const furnituresCartStorage: string | null =
      window.localStorage.getItem("FurnituresSiteCart");

    const productToCart: productToCartType = {
      productsAmount: productsAmonunt,
      productTotalPrice: productsAmonunt * detailInfo.data.price,
      productData: detailInfo,
    };

    if (!furnituresCartStorage) {
      window.localStorage.setItem(
        "FurnituresSiteCart",
        JSON.stringify([productToCart])
      );
      dispatch({ type: "setCartList", payload: [productToCart] });
    } else {
      let newFurnituresCartStorage: productToCartType[] = JSON.parse(
        furnituresCartStorage
      );

      const isVideoAdded =
        newFurnituresCartStorage.filter(
          (product: productToCartType) =>
            product.productData.id === detailInfo.id
        ).length > 0;

      if (isVideoAdded) {
        newFurnituresCartStorage.forEach(
          (product: productToCartType, index: number) => {
            if (product.productData.id === detailInfo.id) {
              const isEnoughStock =
                product.productsAmount <= detailInfo.data.stock;

              const isPosibleAddMore =
                product.productsAmount + productsAmonunt <=
                detailInfo.data.stock;

              if (isEnoughStock && isPosibleAddMore) {
                const updatedProductAmount =
                  newFurnituresCartStorage[index].productsAmount +
                  productsAmonunt;
                const updatedProductTotalPrice =
                  updatedProductAmount *
                  newFurnituresCartStorage[index].productData.data.price;

                newFurnituresCartStorage[index].productsAmount =
                  updatedProductAmount;
                newFurnituresCartStorage[index].productTotalPrice =
                  updatedProductTotalPrice;
              } else {
                if (!isEnoughStock) {
                  alert("You have excceded the stock limit in your cart!");
                }
                if (!isPosibleAddMore) {
                  if (detailInfo.data.stock === product.productsAmount) {
                    alert(
                      "You have added all the available stock to your cart!"
                    );
                  }
                  if (detailInfo.data.stock > product.productsAmount) {
                    alert(
                      "Only is possible add " +
                        (detailInfo.data.stock - product.productsAmount) +
                        " items more to your cart!"
                    );
                  }
                }
              }
            }
          }
        );
      } else {
        newFurnituresCartStorage.push(productToCart);
      }

      window.localStorage.setItem(
        "FurnituresSiteCart",
        JSON.stringify(newFurnituresCartStorage)
      );
      dispatch({ type: "setCartList", payload: newFurnituresCartStorage });
    }
  };

  const counterAddItem = () => {
    if (productStock > 0) {
      setProductsAmount(productsAmonunt + 1);
      setProductStock(productStock - 1);
    }
  };

  const counterRemoveItem = () => {
    if (productsAmonunt > 1) {
      setProductsAmount(productsAmonunt - 1);
      setProductStock(productStock + 1);
    }
  };

  return (
    <section>
      <h1 className={classes["detail-title"]}>{detailInfo.data.name}</h1>
      <p className={classes["detail-sku"]}>
        <b>SKU: </b>
        {detailInfo.data.sku}
      </p>
      <p className={classes["detail-category"]}>
        <b>Category: </b>
        <span>{detailInfo.data.category.slug}</span>
      </p>
      <label className="price-sticker">
        <sup>$</sup>
        {detailInfo.data.price}
      </label>
      <p className={classes["detail-tags"]}>
        {detailInfo.tags.map((tag) => (
          <span key={tag} className={classes["tag"]}>
            {tag}
          </span>
        ))}
      </p>
      <p>{detailInfo.data.description[0].text}</p>
      {detailInfo.data.specs.map((spec) => (
        <p key={spec.spec_name}>
          <b>{spec.spec_name}</b>: {spec.spec_value}
        </p>
      ))}

      <div className={classes["detail-controls"]}>
        <button
          type="button"
          className={classes["counter-cta"]}
          onClick={counterRemoveItem}
          disabled={productsAmonunt === 1}
        >
          -
        </button>
        <span className={classes["item-counter"]}>{productsAmonunt}</span>
        <button
          type="button"
          className={classes["counter-cta"]}
          onClick={counterAddItem}
          disabled={productStock === 0}
        >
          +
        </button>
        <button
          type="button"
          className={classes["cart-cta"]}
          onClick={addItesmToCart}
        >
          Add to cart
        </button>
        <span>
          <b>{productStock}</b> in stock
        </span>
      </div>
    </section>
  );
}

export default ProductDetailInfo;
