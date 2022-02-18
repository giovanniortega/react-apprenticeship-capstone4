import HomeBanner from "../../components/HomeBanner/HomeBanner.component";
import HomeCategories from "../../components/HomeCategories/HomeCategories.component";
import HomeFeatured from "../../components/HomeFeatured/HomeFeatured.component";

const HomePage = () => {
  return (
    <>
      <HomeBanner />
      <div className="content-container">
        <HomeCategories />
        <HomeFeatured />
      </div>
    </>
  );
};
export default HomePage;
