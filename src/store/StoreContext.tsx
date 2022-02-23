import { useReducer, createContext } from "react";
import storeReducer, { initialStore, ActionsType } from "./StoreReducer";
import { StoreState } from "../types/types";

interface StoreContextProps {
  store: StoreState;
  dispatch: React.Dispatch<ActionsType>;
}

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreContext = createContext<StoreContextProps>(
  {} as StoreContextProps
);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
