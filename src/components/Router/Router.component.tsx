import { Routes, Route } from "react-router-dom";
import HomePage from "../../Pages/Home/Home.page";

const Router = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </main>
  );
};

export default Router;
