import { useContext, useEffect, useCallback } from "react";
import ProductItem from "./ProductItem.component";
import useHttp from "../../utils/hooks/useHttp";
import useFilterProducts from "../../utils/hooks/useFilterCategories";
import { StoreContext } from "../../store/StoreContext";
import { ProductDataType } from "../../types/types";
import classes from "./ProductsGrid.module.scss";

interface ProductsDataType {
  results: ProductDataType[];
}

function ProductsGrid() {
  const { store, dispatch } = useContext(StoreContext);
  const { selectedCategoryProductList, categorySelected } = store;
  const { fetchData } = useHttp();
  const { filterProducts } = useFilterProducts();

  const setProductsData = useCallback((apiData: ProductsDataType) => {
    const { results } = apiData;
    dispatch({ type: "setProductList", payload: apiData });
    filterProducts(categorySelected, results); //Filter products by default
  }, [categorySelected, dispatch, filterProducts]);

  useEffect(() => {
    fetchData("mocks/en-us/products.json", setProductsData);
  }, [fetchData, setProductsData]);

  return (
    <>
      <div className="section-title">
        <h3>Product List</h3>
      </div>
      {selectedCategoryProductList.length > 0 ? (
        <div className={classes["products-container"]}>
          {selectedCategoryProductList.map((product) => (
            <ProductItem key={product.id} productData={product} />
          ))}
        </div>
      ) : (
        <h4 className={classes["warning-text"]}>No products found!</h4>
      )}
    </>
  );
}

export default ProductsGrid;
