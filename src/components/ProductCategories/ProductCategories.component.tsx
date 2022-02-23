import { useEffect, useState } from "react";
import ProductCategoriesItem from "./ProductCategoriesItem.component";
import useHttp from "../../utils/hooks/useHttp";
import { ProductCategoryDataType } from "../../types/types";
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
  const { apiDataIsLoading, apiError, fetchData } = useHttp();
  const [catDropDownIsOpen, setCatDropDownIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchData("mocks/en-us/product-categories.json", setProductCategoriesData);
  }, [fetchData]);

  const dropDownHandler = () => {
    setCatDropDownIsOpen(!catDropDownIsOpen);
  };

  let upDownCatButtonIcon;
  catDropDownIsOpen
    ? (upDownCatButtonIcon = <FaAngleUp />)
    : (upDownCatButtonIcon = <FaAngleDown />);

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
