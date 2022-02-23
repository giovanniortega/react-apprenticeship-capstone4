import { Link } from "react-router-dom";
import { HomeBannerSlideDataType } from "../../types/types";
import classes from "./HomeBannerItem.module.scss";

interface slideProps {
  slideData: HomeBannerSlideDataType;
}

function HomeBannerItem({ slideData }: slideProps) {
  return (
    <section className={classes["main-slide"]}>
      <img
        src={slideData.data.main_image.url}
        alt={slideData.data.main_image.alt}
      />
      <div className={classes["slide-caption-container"]}>
        <div className={classes["slide-caption"]}>
          <h2 className={classes["caption-title"]}>{slideData.data.title}</h2>
          <p className={classes["caption-description"]}>
            {slideData.data.description[0].text}
          </p>
          <Link to="/" className="cta cta-secondary">
            Check this deal
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeBannerItem;
