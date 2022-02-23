import { ProductDataType } from "../../types/types";
import classes from "./ProductItem.module.scss";

interface ProductProps {
  productData: ProductDataType;
}

function ProductItem({ productData }: ProductProps) {
  return (
    <div className={classes["product-card"]}>
      <div className={classes["card-poster"]}>
        <img
          src={productData.data.mainimage.url}
          alt={productData.data.mainimage.alt}
        />
      </div>
      <div className={classes["card-info"]}>
        <h3 className={classes["info-title"]}>{productData.data.name}</h3>
        <p className={classes["info-description"]}>
          {productData.data.short_description}
        </p>
        <p className={classes["info-price"]}>
          <sup>$</sup>
          {productData.data.price}
        </p>
        <button type="button" className="cta cta-secondary">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
