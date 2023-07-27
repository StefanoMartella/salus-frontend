import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { MedicalDay } from "../../api";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { VisitaMedicaStatoVisitaMedicaEnum } from "../../api/models/visita-medica";

type Props = {
  medicalDay: MedicalDay;
};

function MedicalDaySummary({ medicalDay }: Props) {
  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        padding: (theme) => theme.spacing(2),
        borderRadius: (theme) => theme.shape.borderRadius,
        marginBottom: (theme) => theme.spacing(2),
        marginTop: (theme) => theme.spacing(2),
      }}
    >
      <Grid container flexDirection="row" alignItems="center" gap={1}>
        <SummarizeIcon color="primary" />
        <Typography variant="h5">Riepilogo</Typography>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <Typography marginY={2}>Visite totali</Typography>
          <Divider />
          <Typography marginY={2}>
            {medicalDay.visiteMediche?.length}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography marginY={2}>Visite prenotate</Typography>
          <Divider />
          <Typography marginY={2}>
            {
              medicalDay.visiteMediche?.filter(
                (v) =>
                  v.statoVisitaMedica ===
                  VisitaMedicaStatoVisitaMedicaEnum.INSERITA,
              ).length
            }
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography marginY={2}>Slot liberi</Typography>
          <Divider />
          <Typography marginY={2}>10</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography marginY={2}>Stato</Typography>
          <Divider />
          <Typography marginY={2}>{medicalDay.statoMedicalDay}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MedicalDaySummary;
