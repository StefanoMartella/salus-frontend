import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import MedicalDayForm from "../../components/forms/MedicalDayForm";
import AppModal from "../../components/shared/AppModal";
import MedicalDayTable from "../../components/table/MedicalDayTable";

function MedicalDaysPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Grid container>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="contained"
        sx={{
          marginLeft: "auto",
          marginTop: (theme) => theme.spacing(2),
          marginBottom: (theme) => theme.spacing(2),
        }}
      >
        Nuovo medical-day
      </Button>
      <MedicalDayTable />
      <AppModal
        title="Nuovo medical-day"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <MedicalDayForm />
      </AppModal>
    </Grid>
  );
}

export default MedicalDaysPage;
