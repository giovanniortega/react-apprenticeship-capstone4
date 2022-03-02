import { ProductDataType } from "../../types/types";
import classes from "./ProductDetailInfo.module.scss";

interface ProductDetailInfoType {
  detailInfo: ProductDataType;
}

function ProductDetailInfo({ detailInfo }: ProductDetailInfoType) {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

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

      <div className="product-actions">
        <div className={classes["detail-add-cta"]}>
          <input
            type="number"
            defaultValue={1}
            max={detailInfo.data.stock}
            min={1}
          />
          <button type="button">Add to cart</button>
          <span>
            <b>{detailInfo.data.stock}</b> in stock
          </span>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailInfo;
