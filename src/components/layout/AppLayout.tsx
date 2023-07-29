import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarIcon from "@mui/icons-material/Star";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import WidgetsIcon from "@mui/icons-material/Widgets";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import AppTabs, { AppTabMeta } from "../tabs/AppTabs";

//importiamo AppTabMeta dal component AppTabs e lo rendiamo un array e definiamo i diversi paths utili
const tabs: AppTabMeta[] = [
  { label: "Dashboard", to: "/dashboard/*" },
  { label: "Calendario", to: "/calendar/*" },
  { label: "Visite mediche", to: "/visits/*" },
  { label: "Contatti", to: "/contacts/*" },
  { label: "Batch importati", to: "/imports/*" },
];

function AppLayout() {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        flexGrow={1}
        border={1}
        borderColor={theme.palette.grey[300]}
      >
        <Grid>
          <Grid container>
            <Grid
              padding={2}
              borderRight={1}
              borderColor={theme.palette.grey[300]}
            >
              <SupervisedUserCircleIcon color="primary" />
            </Grid>
            <Grid
              padding={2}
              borderRight={1}
              borderColor={theme.palette.grey[300]}
            >
              <WidgetsIcon color="primary" />
              <StarIcon color="warning" />
            </Grid>
          </Grid>
        </Grid>
        <Grid flexGrow={1}>
          <Grid
            container
            height="100%"
            alignItems="center"
            justifyContent="space-between"
            paddingX={2}
          >
            <Typography>Agenzia del demanio</Typography>
            <Grid>
              <Grid container>
                <AccountCircleIcon color="primary" />
                <Typography>Stefano Martella</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AppTabs tabs={tabs} />
      <Grid container margin={1}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default AppLayout;
