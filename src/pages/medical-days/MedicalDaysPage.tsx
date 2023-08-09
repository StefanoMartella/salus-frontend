import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { MedicaDayControllerApi } from "../../api";
import MedicalDayForm, {
  MedicalDayFormValues,
} from "../../components/forms/MedicalDayForm";
import AppModal from "../../components/shared/AppModal";
import MedicalDayTable, {
  MedicalDaysTableHandle,
} from "../../components/table/MedicalDayTable";
import withSnackbar, { SnackbarProps } from "../../hoc/withSnackbar";
import AppBanner from "../../components/shared/AppBanner";

type Props = SnackbarProps;

function MedicalDaysPage({ setSnackbarAttributes }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const tableRef = useRef<MedicalDaysTableHandle>(null);
  const {
    mutate: createMedicalDay,
    isLoading: isCreatingMedicalDay,
    isSuccess: isMedicalDayCreated,
  } = useMutation({
    mutationKey: ["create-medical-day"],
    mutationFn: (values: MedicalDayFormValues) =>
      new MedicaDayControllerApi().create1({
        contrattoId: parseInt(values.contract),
        data: values.date.format("YYYY-MM-DD"),
        // patients: values.patients,
      }),
  });

  useEffect(() => {
    if (isMedicalDayCreated) {
      setIsModalOpen(false);
      setSnackbarAttributes({
        message: "Medical-day creato con successo",
        severity: "success",
      });
      tableRef.current?.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMedicalDayCreated]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBanner title="Medical days" />
      </Grid>
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
      <MedicalDayTable ref={tableRef} />
      <AppModal
        title="Nuovo medical-day"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <MedicalDayForm
          loading={isCreatingMedicalDay}
          onSubmit={(values) => createMedicalDay(values)}
        />
      </AppModal>
    </Grid>
  );
}

export default withSnackbar(MedicalDaysPage);
