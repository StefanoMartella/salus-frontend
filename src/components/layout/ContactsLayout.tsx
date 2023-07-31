import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import HomeBanner from "../shared/HomeBanner";

//componente della tab principale "contatti"
//riprende l'Homebanner e con l'Outlet permette la presenza di componenti innestati, a seconda del path inserito (guarda Router.tsx)
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
