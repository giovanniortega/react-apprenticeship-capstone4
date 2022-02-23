import { useEffect, useState } from "react";
import Slider from "react-slick";
import HomeBannerItem from "./HomeBannerItem.component";
import useHttp from "../../utils/hooks/useHttp";
import { HomeBannerSlideDataType, SliderSettingsType } from "../../types/types";

interface HomeBannerDataType {
  results: HomeBannerSlideDataType[];
}

const HomeBanner = () => {
  const [homeBannerData, setHomeBannerData] =
    useState<HomeBannerDataType>(Object);
  const { results } = homeBannerData;
  const { apiDataIsLoading, apiError, fetchData } = useHttp();

  useEffect(() => {
    fetchData("mocks/en-us/featured-banners.json", setHomeBannerData);
  }, [fetchData]);

  const settings: SliderSettingsType = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <section>
      {!apiDataIsLoading && Object.keys(homeBannerData).length > 0 && (
        <Slider {...settings}>
          {results.map((slide) => (
            <HomeBannerItem key={slide.id} slideData={slide} />
          ))}
        </Slider>
      )}
      {apiDataIsLoading && <p>Data Loading...</p>}
      {apiError && <p>{apiError}</p>}
    </section>
  );
};
export default HomeBanner;
