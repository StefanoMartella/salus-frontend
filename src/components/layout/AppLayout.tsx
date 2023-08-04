import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import AppTabs, { AppTabMeta } from "../tabs/AppTabs";
import Navbar from "./Navbar";

const tabs: AppTabMeta[] = [
  { label: "Dashboard", to: "/dashboard/*" },
  { label: "Calendario", to: "/calendar/*" },
  { label: "Visite mediche", to: "/visits/*" },
  { label: "Contatti", to: "/contacts/*" },
  { label: "Batch importati", to: "/imports/*" },
];

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
