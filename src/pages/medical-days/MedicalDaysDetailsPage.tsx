import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MedicaDayControllerApi, MedicalDay } from "../../api";
import MedicalDaySummary from "../../components/medical-days/MedicalDaySummary";
import PatientsTable, {
  EmployeeInfo,
} from "../../components/table/PatientsTable";

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
      <PatientsTable
        patients={
          medicalDay?.visiteMediche?.map(
            (v) =>
              ({
                ...v.dipendente,
                visitId: v.id,
                attachmentId: v.idCertificato,
              }) as EmployeeInfo,
          ) ?? []
        }
      />
    </Grid>
  );
}

export default MedicalDaysDetailsPage;
