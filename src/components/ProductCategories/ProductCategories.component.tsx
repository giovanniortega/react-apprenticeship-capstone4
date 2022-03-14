import { useState, useEffect } from "react";
import ProductCategoriesItem from "./ProductCategoriesItem.component";
import useHttp from "../../utils/hooks/useHttp";
import { ProductCategoryDataType } from "../../types/types";
import ftImage from "../../images/ft-poster-img.jpg";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import classes from "./ProductCategories.module.scss";

interface ProductCategoriesDataType {
  results: ProductCategoryDataType[];
}

interface categoryProps {
  location: string;
}

const ProductCategories = ({ location }: categoryProps) => {
  const [productCategoriesData, setProductCategoriesData] =
    useState<ProductCategoriesDataType>(Object);
  const { results } = productCategoriesData;
  const [catDropDownIsOpen, setCatDropDownIsOpen] = useState<boolean>(false);
  const { apiDataIsLoading, apiError, isApiMetadataLoading, fetchData } =
    useHttp();

  const allCategoriesData: ProductCategoryDataType = {
    id: "all-products",
    href: "/",
    slugs: ["all-products"],
    data: {
      name: "All our products",
      main_image: {
        alt: "All prooducts",
        url: ftImage,
      },
    },
  };

  const dropDownHandler = () => {
    setCatDropDownIsOpen(!catDropDownIsOpen);
  };

  let upDownCatButtonIcon;
  catDropDownIsOpen
    ? (upDownCatButtonIcon = <FaAngleUp />)
    : (upDownCatButtonIcon = <FaAngleDown />);

  useEffect(() => {
    const queryParams = {
      docType: "category",
      lang: "en-us",
      pageSize: 5,
    };

    if (!isApiMetadataLoading) {
      fetchData(queryParams, setProductCategoriesData);
    }
  }, [isApiMetadataLoading, fetchData]);

  return (
    <div>
      <div className="section-title">
        <h3>Categories</h3>
      </div>

      {!apiDataIsLoading && Object.keys(productCategoriesData).length > 0 && (
        <div
          className={`${classes["categories-container"]} ${
            catDropDownIsOpen && classes["active"]
          }`}
        >
          <button type="button" onClick={dropDownHandler}>
            {upDownCatButtonIcon}
          </button>

          <div
            className={`${classes["category-default"]} ${
              location === "home-page" && classes["hide-category"]
            }`}
          >
            <ProductCategoriesItem
              dataCategory={allCategoriesData}
              closeCat={dropDownHandler}
            />
          </div>

          {results.map((category) => (
            <ProductCategoriesItem
              key={category.id}
              dataCategory={category}
              closeCat={dropDownHandler}
              location={location}
            />
          ))}
        </div>
      )}
      {apiDataIsLoading && <p>Data Loading...</p>}
      {apiError && <p>{apiError}</p>}
    </div>
  );
};
export default ProductCategories;
