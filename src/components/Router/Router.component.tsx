import { useContext } from "react";
import { StoreContext } from "../../store/StoreContext";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../Pages/Home/Home.page";
import ProductList from "../../Pages/ProductList/ProductList.page";
import ProductDetailPage from "../../Pages/ProductDetail/ProductDetail.page";
import SearchResults from "../../Pages/SearchResults/SearchResults.page";
import ShoppingCart from "../../Pages/ShoppingCart/ShoppingCart.page";
import Checkout from "../../Pages/Checkout/Checkout.page";

const Router = () => {
  const { store } = useContext(StoreContext);
  const { cartList } = store;

  const error404 = (
    <div className="section-title">
      <h3>Uupps!!!, there is nothing here! </h3>
    </div>
  );
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate replace to="/" />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/search" element={<SearchResults />} />
        {cartList.length > 0 && (
          <Route path="/cart" element={<ShoppingCart />} />
        )}
        {cartList.length > 0 && (
          <Route path="/checkout" element={<Checkout />} />
        )}
        <Route path="*" element={error404} />
      </Routes>
    </main>
  );
};

export default Router;
