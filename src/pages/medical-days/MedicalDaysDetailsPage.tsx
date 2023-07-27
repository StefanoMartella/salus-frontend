import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MedicaDayControllerApi, MedicalDay } from "../../api";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import MedicalDaySummary from "../../components/medical-days/MedicalDaySummary";

function MedicalDaysDetailsPage() {
  const { id } = useParams();
  const { data: medicalDay, isLoading } = useQuery({
    queryKey: ["medical-day-details", id],
    queryFn: () =>
      new MedicaDayControllerApi().findById1(id as unknown as number),
    select: (response) => response.data,
  });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container flexDirection="column">
      <MedicalDaySummary medicalDay={medicalDay as MedicalDay} />
    </Grid>
  );
}

export default MedicalDaysDetailsPage;
