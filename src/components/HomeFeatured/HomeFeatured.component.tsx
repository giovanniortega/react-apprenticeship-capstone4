import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import useHttp from "../../utils/hooks/useHttp";
import HomeFeaturedItem from "./HomeFeaturedItem.component";
import { StoreContext } from "../../store/StoreContext";
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
  const { dispatch } = useContext(StoreContext);
  const { apiDataIsLoading, apiError, isApiMetadataLoading, fetchData } =
    useHttp();
  const navigate = useNavigate();

  const viewAllProductsHandler = () => {
    dispatch({ type: "setCategorySelected", payload: "all-products" });
    navigate("/products");
  };

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
    const queryParams = {
      docType: "product",
      docTags: "Featured",
      lang: "en-us",
      pageSize: 16,
    };

    if (!isApiMetadataLoading) {
      fetchData(queryParams, setHomeFeaturedData);
    }
  }, [isApiMetadataLoading, fetchData]);

  return (
    <section>
      <div className="section-title">
        <h3>Bestselling in home</h3>
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
        <button className="cta cta-primary" onClick={viewAllProductsHandler}>
          View all products
        </button>
      </div>
    </section>
  );
};

export default HomeFeatured;
