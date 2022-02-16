import React from "react";
import classes from "./Search.module.scss";
import { FaSearch } from "react-icons/fa";

function Search() {
  const submitForm = (evt: any) => {
    evt.preventDefault();
  };

  return (
    <form onSubmit={submitForm} className={classes["search-form"]}>
      <input type="text" placeholder="Search" />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
}

export default Search;
