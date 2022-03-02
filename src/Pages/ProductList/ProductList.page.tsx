import { useContext, useCallback, useEffect } from "react";
import useHttp from "../../utils/hooks/useHttp";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid.component";
import ProductCategories from "../../components/ProductCategories/ProductCategories.component";
import useFilterProducts from "../../utils/hooks/useFilterProducts";
import { ProductDataType } from "../../types/types";
import { StoreContext } from "../../store/StoreContext";
interface ProductsDataType {
  results: ProductDataType[];
}

function ProductList() {
  const { filterProducts } = useFilterProducts();
  const { store, dispatch } = useContext(StoreContext);
  const { categorySelected } = store;
  const { apiDataIsLoading, apiError, isApiMetadataLoading, fetchData } =
    useHttp();

  const setProductsData = useCallback(
    (apiData: ProductsDataType) => {
      const { results } = apiData;
      dispatch({ type: "setProductList", payload: apiData });
      filterProducts(categorySelected, results); //Filter products by default
    },
    [categorySelected, filterProducts, dispatch]
  );

  useEffect(() => {
    const queryParams = {
      docType: "product",
      lang: "en-us",
      pageSize: 90,
    };

    if (!isApiMetadataLoading) {
      fetchData(queryParams, setProductsData);
    }
  }, [isApiMetadataLoading, fetchData, setProductsData]);

  return (
    <>
      <div className="content-container aside-layout">
        <aside>
          <ProductCategories location="product-list" />
        </aside>
        <section>
          <div className="section-title">
            <h3>Product List</h3>
          </div>
          {!apiDataIsLoading && <ProductsGrid />}
          {apiDataIsLoading && <p>Data Loading...</p>}
          {apiError && <p>{apiError}</p>}
        </section>
      </div>
    </>
  );
}

export default ProductList;
