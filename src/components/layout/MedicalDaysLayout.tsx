import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import HomeBanner from "../shared/HomeBanner";

//componente della tab principale "Visite Mediche"
//riprende l'Homebanner e con l'Outlet permette la presenza di componenti innestati, a seconda del path inserito (guarda Router.tsx) dopo il path "visits"
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
