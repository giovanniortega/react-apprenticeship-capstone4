import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../Pages/Home/Home.page";
import ProductList from "../../Pages/ProductList/ProductList.page";
import ProductDetailPage from "../../Pages/ProductDetail/ProductDetail.page";
import SearchResults from "../../Pages/SearchResults/SearchResults.page";

const Router = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate replace to="/" />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </main>
  );
};

export default Router;
