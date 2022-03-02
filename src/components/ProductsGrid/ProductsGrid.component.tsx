import { useContext, useCallback, useEffect, useState } from "react";
import ProductItem from "./ProductItem.component";
import Pagination from "../Pagination/Pagination.component";
import { StoreContext } from "../../store/StoreContext";
import { ProductDataType } from "../../types/types";
import classes from "./ProductsGrid.module.scss";

function ProductsGrid() {
  const { store } = useContext(StoreContext);
  const { selectedCategoryProductList } = store;
  const [pageItems, setPageItems] = useState<ProductDataType[]>([]);
  const [activePage, setActivePage] = useState<number>(1);

  const itemsPerPage: number = 12;

  const getItemsPerPage = useCallback(
    (from: number, to: number, activePage: number) => {
      const currentItems = selectedCategoryProductList.slice(from, to);

      setPageItems(currentItems);
      setActivePage(activePage);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [selectedCategoryProductList]
  );

  useEffect(() => {
    getItemsPerPage(0, itemsPerPage, 1);
  }, [selectedCategoryProductList, getItemsPerPage]);

  return (
    <>
      {pageItems.length > 0 ? (
        <div className={classes["products-container"]}>
          {pageItems.map((product) => (
            <ProductItem key={product.id} productData={product} />
          ))}
        </div>
      ) : (
        <h4 className={classes["warning-text"]}>No products found!</h4>
      )}
      <Pagination
        itemsLength={selectedCategoryProductList.length}
        itemsPerPage={itemsPerPage}
        getItemsPerPageHanlder={getItemsPerPage}
        activePage={activePage}
      />
    </>
  );
}

export default ProductsGrid;
