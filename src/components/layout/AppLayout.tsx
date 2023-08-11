import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import AppTabs, { AppTabMeta } from "../tabs/AppTabs";
import Navbar from "./Navbar";

//importiamo AppTabMeta dal component AppTabs e lo rendiamo un array e definiamo i diversi paths utili
const tabs: AppTabMeta[] = [
  { label: "Dashboard", to: "/dashboard/*" },
  { label: "Calendario", to: "/calendar/*" },
  { label: "Visite mediche", to: "/visits/*" },
  { label: "Contatti", to: "/contacts/*" },
];

//componente che corrisponde alla barra di navigazione in alto, uguale per ogni pagina del nostro sito web
function AppLayout() {
  return (
    <Grid container>
      <Navbar />
      <AppTabs tabs={tabs} />
      <Grid container margin={2}>
        <Grid item xs={12} padding={1}>
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AppLayout;
