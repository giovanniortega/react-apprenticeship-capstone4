import { useContext, useCallback } from "react";
import { StoreContext } from "../../store/StoreContext";
import { ProductDataType } from "../../types/types";

function useFilterProducts() {
  const { dispatch } = useContext(StoreContext);

  const filterProducts = useCallback(
    (category: string, productList: ProductDataType[]) => {
      const filteredResults = productList.filter((item) => {
        const productCategory = item.data.category.id;
        const thisCategorySelected = category;

        let isProductCategory = false;

        if (productCategory === thisCategorySelected) {
          isProductCategory = true;
        }

        return isProductCategory;
      });

      dispatch({ type: "setSelectedProductList", payload: filteredResults });
    },
    [dispatch]
  );

  return { filterProducts };
}

export default useFilterProducts;
