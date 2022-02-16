import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import useHttp from "../../utils/hooks/useHttp";
import { HomeBannerType } from "../../types/types";
import classes from "./HomeBanner.module.scss";

const HomeBanner = () => {
  const [homeBannerData, setHomeBannerData] = useState<any | HomeBannerType>(
    {}
  );
  const { apiDataIsLoading, apiError, fetchData } = useHttp();

  useEffect(() => {
    fetchData("home-featured-banner.json", setHomeBannerData);
  }, [fetchData]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <>
      {!apiDataIsLoading && Object.keys(homeBannerData).length > 0 && (
        <Slider {...settings} className={classes["home-banner-slider"]}>
          {homeBannerData.results.map((item: any) => (
            <section key={item.id} className={classes["main-slide"]}>
              <img
                src={item.data.main_image.url}
                alt={item.data.main_image.alt}
              />
              <div className={classes["slide-caption-container"]}>
                <div className={classes["slide-caption"]}>
                  <h2 className={classes["caption-title"]}>
                    {item.data.title}
                  </h2>
                  <p className={classes["caption-description"]}>
                    {item.data.description[0].text}
                  </p>
                  <Link to="/" className={classes["caption-cta"]}>
                    Check this deal
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </Slider>
      )}
      {apiDataIsLoading && <p>Data Loading...</p>}
      {apiError && <p>{apiError}</p>}
    </>
  );
};
export default HomeBanner;
