import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import useHttp from "../../utils/hooks/useHttp";
import { HomeCategoriesType } from "../../types/types";
import classes from "./HomeCategories.module.scss";

const HomeCategories = () => {
  const [homeCategoriesData, setHomeCategoriesData] = useState<
    any | HomeCategoriesType
  >({});
  const { apiDataIsLoading, apiError, fetchData } = useHttp();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
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
    fetchData("home-categories.json", setHomeCategoriesData);
  }, [fetchData]);

  return (
    <>
      <div className="section-title">
        <h3>Our Categories</h3>
      </div>

      {!apiDataIsLoading && Object.keys(homeCategoriesData).length > 0 && (
        <section className={classes["categories-container"]}>
          <Slider {...settings} className={classes["home-banner-slider"]}>
            {homeCategoriesData.results.map((item: any) => (
              <Link
                to={item.href}
                key={item.id}
                className={classes["category-card"]}
              >
                <img
                  src={item.data.main_image.url}
                  alt={item.data.main_image.alt}
                  className={classes["card-image"]}
                />
                <p className={classes["card-description"]}>{item.data.name}</p>
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
export default HomeCategories;
