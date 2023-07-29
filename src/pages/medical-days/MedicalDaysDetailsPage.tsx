import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MedicaDayControllerApi, MedicalDay } from "../../api";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import MedicalDaySummary from "../../components/medical-days/MedicalDaySummary";

function MedicalDaysDetailsPage() {
  const { id } = useParams(); //prendiamo l'id dall'url come param
  //facciamo la chiamata al backend per prendere un singolo medicalDay basato sul suo id, e chiamiamo la risposta "medicalDay"
  const { data: medicalDay, isLoading } = useQuery({
    queryKey: ["medical-day-details", id],
    queryFn: () =>
      new MedicaDayControllerApi().findById1(id as unknown as number), //passiamo come id quello preso dall'url, quindi quello chiesto dall'utente
    select: (response) => response.data,
  });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container flexDirection="column">
      {/* passiamo il medicalday come prop al componente che si occuperà di mostrarne i dettagli */}
      <MedicalDaySummary medicalDay={medicalDay as MedicalDay} />
    </Grid>
  );
}

export default MedicalDaysDetailsPage;
