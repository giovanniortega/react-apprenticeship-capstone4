import { useContext } from "react";
import { StoreContext } from "../../store/StoreContext";
import { ProductDataType } from "../../types/types";

function useFilterProducts() {
  const { dispatch } = useContext(StoreContext);

  const filterProducts = (category: string, productList: ProductDataType[]) => {
    const filteredResults = productList.filter((item) => {
      const productCategory = item.data.category.id;
      const thisCategorySelected = category;

      if (productCategory === thisCategorySelected) {
        return item;
      }
    });

    dispatch({ type: "setSelectedProductList", payload: filteredResults });
  };

  return { filterProducts };
}

export default useFilterProducts;
