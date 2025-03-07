import {AppRouter} from "./router/AppRouter"
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ColorModeContext, useMode} from "./theme";

export const DashboardApp = () => {
  const [ theme, colorMode ] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}
