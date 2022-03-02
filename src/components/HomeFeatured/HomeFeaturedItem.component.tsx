import { Link } from "react-router-dom";
import { HomeFeaturedItemDataType } from "../../types/types";
import classes from "./HomeFeaturedItem.module.scss";

interface featuredProps {
  featuredData: HomeFeaturedItemDataType;
}

function HomeFeaturedItem({ featuredData }: featuredProps) {
  return (
    <div className={classes["featured-card"]}>
      <Link
        to={`/product/${featuredData.id}`}
        className={classes["featured-poster"]}
      >
        <img
          src={featuredData.data.mainimage.url}
          alt={featuredData.data.mainimage.alt}
          className={classes["poster-image"]}
        />
        <div className={classes["poster-title-container"]}>
          <h4 className={classes["poster-title"]}>{featuredData.data.name}</h4>
        </div>
        <p className={classes["poster-category"]}>
          {featuredData.data.category.slug}
        </p>
      </Link>
      <div className={classes["card-info"]}>
        <p className={classes["info-price"]}>
          <sup>$</sup>
          {featuredData.data.price}
        </p>
      </div>
    </div>
  );
}

export default HomeFeaturedItem;
