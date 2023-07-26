import { Grid } from "@mui/material";
import HomeBanner from "../../components/shared/HomeBanner";
import VisiteMedicheTab from "../../components/tabs/VisiteMedicheTab";
import Riepilogo from "../../components/shared/Riepilogo";
import Pazienti from "../../components/shared/Pazienti";

function VisitaMedicaPage() {
  return (
    <Grid container>
      <Grid item xs={12} padding={1}>
        <HomeBanner />
        <Grid>
          <VisiteMedicheTab />
        </Grid>
        <Grid container>
          <Riepilogo />
        </Grid>
        <Grid container>
          <Pazienti />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default VisitaMedicaPage;
