import { StoreState, ProductDataType, productToCartType } from "../types/types";

const initialStore: StoreState = {
  categorySelected: "all-products",
  productList: {
    results: [],
  },
  selectedCategoryProductList: [],
  cartList: [],
};

interface ProductsDataType {
  results: ProductDataType[];
}

export type ActionsType =
  | { type: "setCategorySelected"; payload: string }
  | { type: "setProductList"; payload: ProductsDataType }
  | { type: "setSelectedProductList"; payload: ProductDataType[] }
  | { type: "setCartList"; payload: productToCartType[] };

const storeReducer = (state: StoreState, action: ActionsType): StoreState => {
  switch (action.type) {
    case "setCategorySelected":
      return {
        ...state,
        categorySelected: action.payload,
      };
    case "setProductList":
      return {
        ...state,
        productList: action.payload,
      };
    case "setSelectedProductList":
      return {
        ...state,
        selectedCategoryProductList: action.payload,
      };
    case "setCartList":
      return {
        ...state,
        cartList: action.payload,
      };
    default:
      return state;
  }
};

export { initialStore };
export default storeReducer;
