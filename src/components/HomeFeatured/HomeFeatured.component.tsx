import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import useHttp from "../../utils/hooks/useHttp";
import HomeFeaturedItem from "./HomeFeaturedItem.component";
import {
  HomeFeaturedItemDataType,
  SliderSettingsType,
} from "../../types/types";
import classes from "./HomeFeatured.module.scss";

interface HomeFeaturedDataType {
  results: HomeFeaturedItemDataType[];
}

const HomeFeatured = () => {
  const [homeFeaturedData, setHomeFeaturedData] =
    useState<HomeFeaturedDataType>(Object);
  const { results } = homeFeaturedData;
  const { apiDataIsLoading, apiError, fetchData } = useHttp();

  const settings: SliderSettingsType = {
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
    fetchData("mocks/en-us/featured-products.json", setHomeFeaturedData);
  }, [fetchData]);

  return (
    <section>
      <div className="section-title">
        <h3>Bestselling in home furniture</h3>
      </div>

      {!apiDataIsLoading && Object.keys(homeFeaturedData).length > 0 && (
        <Slider
          {...settings}
          className={`${classes["featured-slider"]} slick-buttons-top-30`}
        >
          {results.map((featured) => (
            <HomeFeaturedItem featuredData={featured} key={featured.id} />
          ))}
        </Slider>
      )}
      {apiDataIsLoading && <p>Data Loading...</p>}
      {apiError && <p>{apiError}</p>}

      <div className="t-align-center mt-50">
        <Link to="/product-list" className="cta cta-primary">
          View all products
        </Link>
      </div>
    </section>
  );
};

export default HomeFeatured;
