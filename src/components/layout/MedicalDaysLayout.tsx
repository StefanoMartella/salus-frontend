import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import HomeBanner from "../shared/HomeBanner";

function MedicalDaysLayout() {
  return (
    <Grid container>
      <Grid item xs={12} padding={1}>
        <HomeBanner />
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default MedicalDaysLayout;
