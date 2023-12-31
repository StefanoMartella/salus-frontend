import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import HomeBanner from "../../components/shared/HomeBanner";
import HomeBoxes from "../../components/shared/HomeBoxes";
import TodayEvents from "../../components/shared/TodayEvents";
import TodaySection from "../../components/shared/TodaySection";
import MedicalDayTable from "../../components/table/MedicalDayTable";

function DashboardPage() {
  return (
    <Grid container>
      <Grid item xs={10} padding={1}>
        <HomeBanner />
        <HomeBoxes />
        <Typography variant="h6" marginY={4} marginBottom={2}>
          Elenco medical days
        </Typography>
        <MedicalDayTable />
      </Grid>
      <Grid item xs={2} padding={1}>
        <TodaySection />
        <TodayEvents />
      </Grid>
    </Grid>
  );
}

export default DashboardPage;
