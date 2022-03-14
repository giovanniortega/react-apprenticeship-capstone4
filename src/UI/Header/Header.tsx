import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";
import { FaShoppingCart, FaSearch, FaTimes } from "react-icons/fa";
import Search from "../../components/Search/Search.component";
import classes from "./Header.module.scss";

const Header = () => {
  const { store, dispatch } = useContext(StoreContext);
  const { cartList } = store;
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);

  const furnituresCartStorage: string | null =
    window.localStorage.getItem("FurnituresSiteCart");

  useEffect(() => {
    if (furnituresCartStorage) {
      dispatch({
        type: "setCartList",
        payload: JSON.parse(furnituresCartStorage),
      });
    }
  }, [dispatch, furnituresCartStorage]);

  const searchToggleHandler = () => {
    setSearchIsOpen(!searchIsOpen);
  };

  let searchIcon;
  searchIsOpen ? (searchIcon = <FaTimes />) : (searchIcon = <FaSearch />);

  return (
    <header className={classes.header}>
      <div className={classes["header-left"]}>
        <h1 className={classes.logo}>
          <Link to="/">
            Furni<span>tures</span>
          </Link>
        </h1>
      </div>
      <div className={classes["header-right"]}>
        <div
          className={`${classes["search-component"]} ${
            searchIsOpen && classes["active"]
          }`}
        >
          <Search onClose={searchToggleHandler} />
        </div>
        <ul className={classes["utilities-menu"]}>
          <li className={classes["search-mob-cta"]}>
            <button onClick={searchToggleHandler}>{searchIcon}</button>
          </li>
          <li>
            <Link to="/cart" className={classes["cart-link"]}>
              <FaShoppingCart />
              <span className={classes["cart-badge"]}>{cartList.length}</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
