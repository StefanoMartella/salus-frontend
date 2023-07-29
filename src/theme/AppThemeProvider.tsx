import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    // primary: {
    //   main: "#dd8844",
    // },
    // secondary: {
    //   main: "#885453",
    // },
  },
});

type Props = {
  children: ReactNode;
};

//componente del tema
//verrà inserito nell'App.tsx in modo che abbracci tutti i componenti che vogliamo che abbiano lo stesso tema
//tutti i componenti abbracciati costituiscono la prop "children" che viene infatti qui passata
export default function AppThemeProvider({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
