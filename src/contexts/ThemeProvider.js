import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";

const ThemeContext = createContext({ toggleColorMode: () => {} });

function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "dark" && {
        primary: {
          main: "#f50057",
        },
      }),
    },
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
