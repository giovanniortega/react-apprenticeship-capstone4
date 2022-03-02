import { useContext } from "react";
import { useNavigate } from "react-router";
import { StoreContext } from "../../store/StoreContext";
import useFilterProducts from "../../utils/hooks/useFilterProducts";
import { ProductCategoryDataType } from "../../types/types";
import classes from "./ProductCategoriesItem.module.scss";

interface categoryItemProps {
  dataCategory: ProductCategoryDataType;
  closeCat: () => void;
  location?: string;
}

function ProductCategoriesItem({
  dataCategory,
  closeCat,
  location,
}: categoryItemProps) {
  const { store, dispatch } = useContext(StoreContext);
  const { categorySelected, productList } = store;
  const { results } = productList;
  const navigate = useNavigate();
  const { filterProducts } = useFilterProducts();

  const categoryHandler = (evt: any) => {
    const categoryValue = evt.target.value;
    const slug = dataCategory.slugs[0];

    dispatch({ type: "setCategorySelected", payload: categoryValue });

    filterProducts(categoryValue, results);

    if (location === "home-page") {
      navigate(`/products?category=${slug}`);
    }

    closeCat();
  };

  return (
    <div
      className={`${classes["category-card"]} ${
        location === "home-page" && classes[location]
      }`}
    >
      <input
        type="radio"
        id={dataCategory.id}
        name="category-option"
        value={dataCategory.id}
        onChange={categoryHandler}
        defaultChecked={categorySelected === dataCategory.id}
      />

      <label htmlFor={dataCategory.id}>
        <img
          src={dataCategory.data.main_image.url}
          alt={dataCategory.data.main_image.alt}
          className={classes["card-image"]}
        />

        <p className={classes["card-description"]}>{dataCategory.data.name}</p>
      </label>
    </div>
  );
}

export default ProductCategoriesItem;
