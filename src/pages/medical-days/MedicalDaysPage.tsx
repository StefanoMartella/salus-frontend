import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MedicalDayTable from "../../components/table/MedicalDayTable";
import { useState } from "react";
import AppModal from "../../components/shared/AppModal";
import MedicalDayForm from "../../components/forms/MedicalDayForm";

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
