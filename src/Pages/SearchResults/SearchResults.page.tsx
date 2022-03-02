import { useCallback, useEffect, useContext } from "react";
import { StoreContext } from "../../store/StoreContext";
import useHttp from "../../utils/hooks/useHttp";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid.component";
import useFilterProducts from "../../utils/hooks/useFilterProducts";
import { ProductDataType } from "../../types/types";

interface ProductResultsDataType {
  results: ProductDataType[];
}

function SearchResults() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const { store } = useContext(StoreContext);
  const { selectedCategoryProductList } = store;

  const { filterProducts } = useFilterProducts();
  const { apiDataIsLoading, apiError, isApiMetadataLoading, fetchData } =
    useHttp();

  const setProductsData = useCallback(
    (apiData: ProductResultsDataType) => {
      const { results } = apiData;
      filterProducts("all-products", results);
    },
    [filterProducts]
  );

  useEffect(() => {
    const queryParams = {
      docType: "product",
      searchTerm: params.q,
      lang: "en-us",
      pageSize: 20,
    };

    if (!isApiMetadataLoading) {
      fetchData(queryParams, setProductsData);
    }
  }, [isApiMetadataLoading, fetchData, params.q, setProductsData]);

  return (
    <div className="content-container">
      <div className="section-title">
        <h3>
          {selectedCategoryProductList.length} result
          {selectedCategoryProductList.length > 1 ||
            (selectedCategoryProductList.length === 0 && "s")}{" "}
          for {params.q}
        </h3>
      </div>
      {!apiDataIsLoading && <ProductsGrid />}
      {apiDataIsLoading && <p>Data Loading...</p>}
      {apiError && <p>{apiError}</p>}
    </div>
  );
}

export default SearchResults;
