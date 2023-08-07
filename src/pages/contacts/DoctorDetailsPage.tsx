import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MedicoControllerApi } from "../../api";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import CircularProgress from "@mui/material/CircularProgress";
import CardInfo from "../../components/shared/CardInfo";
import CustomListItem from "../../components/shared/CustomListItem";

function DoctorDetailsPage() {
  const { id } = useParams();
  const { data: doctor, isLoading: isDoctorLoading } = useQuery({
    queryKey: ["doctor-details", id],
    queryFn: () => new MedicoControllerApi().findById(id as unknown as number),
    select: (response) => response.data,
  });

  return isDoctorLoading ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <CardInfo title="Informazioni generali">
          <List>
            <CustomListItem
              title="Codice fiscale"
              subTitle={doctor?.codiceFiscale ?? ""}
              withDivider
            />
            <CustomListItem
              title="Data di nascita"
              subTitle={doctor?.dataNascita ?? ""}
              withDivider
            />
            <CustomListItem
              title="Numero di telefono"
              subTitle={doctor?.numeroTelefono ?? ""}
              withDivider
            />
            <CustomListItem
              title="Titolo di studio"
              subTitle={doctor?.titoloStudi ?? ""}
            />
          </List>
        </CardInfo>
      </Grid>
    </Grid>
  );
}

export default DoctorDetailsPage;
