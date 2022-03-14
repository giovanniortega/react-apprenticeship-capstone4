import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ProductDataType } from "../../types/types";
import useHttp from "../../utils/hooks/useHttp";
import ProductGallery from "../../components/ProductGallery/ProductGallery.component";
import ProductDetailInfo from "../../components/ProductDetailsInfo/ProductDetailInfo.component";
import classes from "./ProductDetail.module.scss";
import HomeFeatured from "../../components/HomeFeatured/HomeFeatured.component";

interface ProductResultsDataType {
  results: ProductDataType[];
}

function ProductDetailPage() {
  const [productData, setProductData] =
    useState<ProductResultsDataType>(Object);
  const { results } = productData;
  const { apiDataIsLoading, apiError, isApiMetadataLoading, fetchData } =
    useHttp();
  const { productId } = useParams();

  useEffect(() => {
    const queryParams = {
      docId: productId,
    };

    if (!isApiMetadataLoading) {
      fetchData(queryParams, setProductData);
    }
  }, [isApiMetadataLoading, fetchData, productId]);

  return (
    <div className="content-container">
      {!apiDataIsLoading && Object.keys(productData).length > 0 && (
        <div className={classes["product-container"]}>
          <div className={classes["container-left"]}>
            <ProductGallery galleryData={results[0].data.images} />
          </div>
          <div className={classes["container-right"]}>
            <ProductDetailInfo detailInfo={results[0]} />
          </div>
        </div>
      )}
      {apiDataIsLoading && <p>Data Loading...</p>}
      {apiError && <p>{apiError}</p>}
      <HomeFeatured />
    </div>
  );
}

export default ProductDetailPage;
