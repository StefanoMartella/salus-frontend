import Grid from "@mui/material/Grid";
import HomeBanner from "../../components/shared/HomeBanner";
import HomeBoxes from "../../components/shared/HomeBoxes";
import TodayEvents from "../../components/shared/TodayEvents";
import TodaySection from "../../components/shared/TodaySection";
import MedicalDayTable from "../../components/table/MedicalDayTable";

function DashboardPage() {
  return (
    <Grid container spacing={2}>
      {/* Left container */}
      <Grid item xs={10}>
        <HomeBanner />
        <HomeBoxes />
        <MedicalDayTable />
      </Grid>
      {/* Right container */}
      <Grid item xs={2}>
        <TodaySection />
        <TodayEvents />
      </Grid>
    </Grid>
  );
}

export default DashboardPage;
