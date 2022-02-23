import { Link } from "react-router-dom";
import { HomeFeaturedItemDataType } from "../../types/types";
import classes from "./HomeFeaturedItem.module.scss";

interface featuredProps {
  featuredData: HomeFeaturedItemDataType;
}

function HomeFeaturedItem({ featuredData }: featuredProps) {
  return (
    <Link to={featuredData.href} className={classes["featured-card"]}>
      <div className={classes["featured-image-container"]}>
        <img
          src={featuredData.data.mainimage.url}
          alt={featuredData.data.mainimage.alt}
          className={classes["card-image"]}
        />
        <div className={classes["card-title-container"]}>
          <h4 className={classes["card-title"]}>{featuredData.data.name}</h4>
        </div>
        <span className={classes["card-price"]}>
          <sup>$</sup>
          {featuredData.data.price}
        </span>
      </div>
      <p className={classes["card-description"]}>
        {featuredData.data.short_description}
      </p>
      <p
        className={`${classes["card-stock"]} ${
          featuredData.data.stock < 4 && classes["alert"]
        }`}
      >
        {featuredData.data.stock < 4 && "Only"} {featuredData.data.stock} in
        stock
      </p>
    </Link>
  );
}

export default HomeFeaturedItem;
