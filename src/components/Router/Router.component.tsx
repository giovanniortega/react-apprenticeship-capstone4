import { Routes, Route } from "react-router-dom";
import HomePage from "../../Pages/Home/Home.page";
import ProductList from "../../Pages/ProductList/ProductList.page";

const Router = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product-list" element={<ProductList/>} />
      </Routes>
    </main>
  );
};

export default Router;
