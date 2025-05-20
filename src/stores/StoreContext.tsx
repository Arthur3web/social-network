import { createContext, useContext } from "react";
import { type RootStore, rootStore } from "./RootStore";

const StoreContext = createContext<RootStore>(rootStore);

export const useStore = () => useContext(StoreContext);

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};
