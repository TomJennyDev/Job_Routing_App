import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";

const useChangeTheme = () => {
  return useContext(ThemeContext);
};

export default useChangeTheme;
