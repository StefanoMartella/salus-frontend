import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import HomeBanner from "../shared/HomeBanner";

function ContactsLayout() {
  return (
    <Grid container>
      <Grid item xs={12} padding={1}>
        <HomeBanner />
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default ContactsLayout;
