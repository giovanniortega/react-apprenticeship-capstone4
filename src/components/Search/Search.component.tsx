import { useState } from "react";
import { useNavigate } from "react-router";
import useHttp from "../../utils/hooks/useHttp";
import useFilterProducts from "../../utils/hooks/useFilterProducts";
import { ProductDataType } from "../../types/types";
import { FaSearch } from "react-icons/fa";
import classes from "./Search.module.scss";

interface ProductResultsDataType {
  results: ProductDataType[];
}

interface SearchPropsType {
  onClose: ()=>void;
}

function Search({onClose}:SearchPropsType) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const { filterProducts } = useFilterProducts();
  const { fetchData } = useHttp();

  const setProductsData = (apiData: ProductResultsDataType) => {
    const { results } = apiData;
    filterProducts("all-products", results);
  };

  const queryParams = {
    docType: "product",
    searchTerm: searchTerm,
    lang: "en-us",
    pageSize: 20,
  };

  const SubmitForm = (evt: any) => {
    evt.preventDefault();
    fetchData(queryParams, setProductsData);
    onClose();
    navigate(`/search?q=${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <form onSubmit={SubmitForm} className={classes["search-form"]}>
      <input
        type="text"
        placeholder="Search"
        onChange={(evt: any) => setSearchTerm(evt.target.value)}
        value={searchTerm}
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
}

export default Search;
