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

//props importate da withSnackbar.tsx che prevede un oggetto con prop interna chiamata snackbarAttributes che è una funzione che prende in input una props chiamata anch'essa snackbarAttributes di tipo SnackbarAttributes che restituisce void
type Props = SnackbarProps;

//MedicalDaysPage non è chiamata da nessuno fuorché il Router, che però non gli passa alcuna props. Allora chi glieli sta passando?
//Secondo me dobbiamo vedere l'HOC withSnackbar.tsx che ha un <WrappedComponent> che sta appunto per MedicalDaysPage. Infatti gli passa proprio la props setSnackbarAttributes
function MedicalDaysPage({ setSnackbarAttributes }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //tableRef viene poi assegnato alla MedicalDayTable (sotto) e le fornisce la capacità di chiamare la refetch (indicata nel tipo MedicalDaysTableHandle)
  const tableRef = useRef<MedicalDaysTableHandle>(null);

  //useMutation serve per fare chiamate Axios come useQuery
  //Però useQuery si usa per le find, invece useMutation si usa per i metodi POST, PUT, DELETE, PATCH, dove appunto si va a mutare o modificare i dati
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

  //questa UseEffect setta la modal aperta e gli inserisce il testo (message) e definisce la severity (ossia success, error e colori) grazie alla setSnackbarAttributes
  //ma se qui non abbiamo alcuna useState di snackbarAttributes, come fa ad usare la set? Perché glielo fornisce come props l'HOC withSnackbar.
  // quindi qui setta gli snackbarAttributes e nella withSnackbar effettua il setting effettivo (??)

  useEffect(() => {
    if (isMedicalDayCreated) {
      setIsModalOpen(false);
      setSnackbarAttributes({
        message: "Medical-day creato con successo",
        severity: "success",
      });
      //qui volevamo che quando è creato un nuovo medical day, la tabella si aggiornasse in automatico con una refetch e mostrasse già il nuovo medical day nella lista
      //si usa la ref che referenzia la MedicalDayTable e ci permette di utilizzare una sua prop (in sto caso la funzione di refetch)
      //la funzione di refetch però la iniettiamo noi in MedicalDayTable.tsx tramite useRef e useImperativeHandle, segui il percorso in quei file
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

      {/* passiamo al MedicalDayTable la capacità di chiamare la funzione di refetch fornita dallo useRef */}
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

//Non esportiamo solo il MedicalDaysPage, ma proprio tutto l'HOC con quello dentro
//ed è quindi proprio questo HOC che verrà chiamato direttamente dal Router, ossia l'insieme di MedicalDaysPage e Snackbar components
export default withSnackbar(MedicalDaysPage);
