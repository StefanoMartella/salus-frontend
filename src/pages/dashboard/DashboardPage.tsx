import Grid from "@mui/material/Grid";
import HomeBoxes from "../../components/shared/HomeBoxes";
import TodayEvents from "../../components/shared/TodayEvents";
import TodaySection from "../../components/shared/TodaySection";
import MedicalDayTable from "../../components/table/MedicalDayTable";
import AppBanner from "../../components/shared/AppBanner";

//componente innestato alla prima pagina: localhost:3000/dashboard
function DashboardPage() {
  return (
    <Grid container spacing={2}>
      {/* Left container */}
      <Grid item xs={10}>
        <AppBanner title="Salus" subTitle="Bentornato, Stefano!" />
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
