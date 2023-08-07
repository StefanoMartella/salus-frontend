import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";
import type {} from "@mui/x-date-pickers/themeAugmentation";

const theme = createTheme({
  components: {
    // MuiDateCalendar: {
    //   styleOverrides: {
    //     root: {
    //       width: "100%",
    //       maxHeight: "inherit",
    //     },
    //     viewTransitionContainer: ({ theme: { spacing } }) => ({
    //       "&  button": {
    //         fontSize: 16,
    //       },
    //       "& > div > div": {
    //         justifyContent: "space-between !important",
    //         padding: `0 ${spacing(1.25)}`,
    //       },
    //       "& div[role=row]": {
    //         padding: `${spacing(3)} ${spacing(1.25)}`,
    //         justifyContent: "space-between !important",
    //       },
    //       "& div[role=presentation]": {
    //         minHeight: 550,
    //       },
    //     }),
    //   },
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
