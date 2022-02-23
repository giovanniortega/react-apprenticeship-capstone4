import Header from "./UI/Header/Header";
import Footer from "./UI/Footer/Footer";
import Router from "./components/Router/Router.component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
}

export default App;
