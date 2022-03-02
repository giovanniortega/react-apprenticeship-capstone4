import HomeBanner from "../../components/HomeBanner/HomeBanner.component";
import ProductCategories from "../../components/ProductCategories/ProductCategories.component";
import HomeFeatured from "../../components/HomeFeatured/HomeFeatured.component";

const HomePage = () => {
  return (
    <>
      <HomeBanner />
      <div className="content-container">
        <ProductCategories location="home-page" />
        <HomeFeatured />
      </div>
    </>
  );
};
export default HomePage;
