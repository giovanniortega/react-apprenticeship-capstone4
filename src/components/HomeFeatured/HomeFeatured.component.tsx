import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import useHttp from "../../utils/hooks/useHttp";
import { HomeFeaturedType } from "../../types/types";
import classes from "./HomeFeatured.module.scss";

const HomeFeatured = () => {
  const [homeFeaturedData, setHomeFeaturedData] = useState<
    any | HomeFeaturedType
  >({});
  const { apiDataIsLoading, apiError, fetchData } = useHttp();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    fetchData("featured-products.json", setHomeFeaturedData);
  }, [fetchData]);

  return (
    <>
      <div className="section-title">
        <h3>Bestselling in home furniture</h3>
      </div>

      {!apiDataIsLoading && Object.keys(homeFeaturedData).length > 0 && (
        <section className={classes["featured-container"]}>
          <Slider
            {...settings}
            className={`${classes["featured-slider"]} slick-buttons-top-30`}
          >
            {homeFeaturedData.results.map((item: any) => (
              <Link
                to={item.href}
                key={item.id}
                className={classes["featured-card"]}
              >
                <div className={classes["featured-image-container"]}>
                  <img
                    src={item.data.mainimage.url}
                    alt={item.data.mainimage.alt}
                    className={classes["card-image"]}
                  />
                  <div className={classes["card-title-container"]}>
                    <h4 className={classes["card-title"]}>{item.data.name}</h4>
                  </div>
                  <span className={classes["card-price"]}>
                    ${item.data.price}
                  </span>
                </div>
                <p className={classes["card-description"]}>
                  {item.data.short_description}
                </p>
                <p
                  className={`${classes["card-stock"]} ${
                    item.data.stock < 4 && classes["alert"]
                  }`}
                >
                  {item.data.stock < 4 && "Only"} {item.data.stock} in stock
                </p>
              </Link>
            ))}
          </Slider>
        </section>
      )}
      {apiDataIsLoading && <p>Data Loading...</p>}
      {apiError && <p>{apiError}</p>}
    </>
  );
};
export default HomeFeatured;
