import { Link } from "react-router-dom";
import { ProductDataType } from "../../types/types";
import classes from "./ProductItem.module.scss";

interface ProductProps {
  productData: ProductDataType;
}

function ProductItem({ productData }: ProductProps) {
  const location = window.location.pathname;

  return (
    <Link
      to={`/product/${productData.id}`}
      className={`${classes["product-card"]} ${
        location === "/search" && classes["search-card"]
      }`}
    >
      <div className={classes["card-poster"]}>
        <img
          src={productData.data.mainimage.url}
          alt={productData.data.mainimage.alt}
        />
      </div>
      <div className={classes["card-info"]}>
        <h3 className={classes["info-title"]}>{productData.data.name}</h3>
        <p className={classes["info-sku"]}>
          <b>SKU: </b>
          {productData.data.sku}
        </p>
        <div className={classes["card-actions"]}>
          <p className="price-sticker">
            <sup>$</sup>
            {productData.data.price}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
