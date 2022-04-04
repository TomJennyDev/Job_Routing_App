import { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";

const useStore = () => {
  return useContext(StoreContext);
};

export default useStore;
