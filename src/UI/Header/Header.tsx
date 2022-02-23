import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaSearch, FaTimes } from "react-icons/fa";
import Search from "../../components/Search/Search.component";
import classes from "./Header.module.scss";
import { useState } from "react";

const Header = () => {
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);

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
          <Search />
        </div>
        <ul className={classes["utilities-menu"]}>
          <li className={classes["search-mob-cta"]}>
            <button onClick={searchToggleHandler}>{searchIcon}</button>
          </li>
          <li>
            <Link to="/">
              <FaShoppingCart />
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaHeart />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
