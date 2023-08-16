/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SERVER_DATE_FORMAT } from "../../utils/date-utils";
import { VALIDATION } from "../../utils/validation";
import AppButton from "../shared/AppButton";
import { useState, useEffect } from "react";

export type CertificateFormValues = {
  eligibility: boolean;
  eligibilityRenew: Dayjs;
  prescription: string;
  file: File;
};

//onSubmit è una funzione che prende in input le props del type inserito e restituisce una Promise
type Props = {
  onSubmit: SubmitHandler<CertificateFormValues>;
  loading: boolean;
};

function CertificateForm({ onSubmit, loading }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificateFormValues>({
    defaultValues: {
      eligibility: false,
      eligibilityRenew: "",
      prescription: "",
      file: undefined,
    },
  });

  const [show, setShow] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }
    //se invece c'è un selectedFile, crea un URL temporaneo del file
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (event: any) => {
    //se non l'utente non carica/seleziona alcun file, allora setta i lo stato dei files a undefined
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    //prendiamo il primo file della lista di file (supponendo che l'utente carichi un solo file)
    setSelectedFile(event.target.files[0]);
    //guarda sotto per il render della anteprima
  };

  return (
    <Grid container gap={3} padding={2}>
      <FormControl fullWidth error={!!errors.eligibility}>
        {/* il Controller dice a useForm come cambia lo stato (ossia il valore) per la chiave elegibility */}
        <Controller
          name="eligibility"
          control={control}
          rules={VALIDATION.certificate.eligibility}
          render={({ field: { value, onChange } }) => (
            <FormControlLabel
              control={<Switch value={value} onChange={onChange} />}
              label="Idoneità"
            />
          )}
        />
        {errors.eligibility?.message && (
          <FormHelperText>{errors.eligibility.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth error={!!errors.eligibilityRenew}>
        <Controller
          name="eligibilityRenew"
          control={control}
          rules={VALIDATION.certificate.eligibilityRenew}
          //value e onChangeestratti dall'oggetto field fornito da react-hook-form. value rappresenta il valore attuale del campo (la data, in forma di stringa), mentre onChange è la funzione da chiamare quando l'utente cambia il valore del campo (seleziona una nuova data).
          render={({ field: { value, onChange } }) => (
            <DatePicker
              value={value}
              onChange={onChange}
              label="Data"
              format={SERVER_DATE_FORMAT}
              slotProps={{
                textField: { error: !!errors.eligibilityRenew?.message },
              }}
            />
          )}
        />
        {errors.eligibilityRenew?.message && (
          <FormHelperText>{errors.eligibilityRenew.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth error={!!errors.prescription}>
        <Controller
          name="prescription"
          control={control}
          rules={VALIDATION.certificate.prescription}
          render={({ field: { value, onChange } }) => (
            <TextField
              placeholder="Prescrizione"
              value={value}
              onChange={onChange}
              label="Prescrizione"
            />
          )}
        />
        {errors.prescription?.message && (
          <FormHelperText>{errors.prescription.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth error={!!errors.file}>
        <Controller
          name="file"
          control={control}
          rules={VALIDATION.certificate.file}
          render={({ field: { value, onChange } }) => (
            <Button variant="contained" component="label">
              Seleziona certificato
              <input
                type="file"
                hidden
                value={(value as any)?.fileName}
                onChange={(event) => {
                  onChange(event.target?.files?.[0]);
                  setShow(true);
                  onSelectFile(event);
                }}
              />
            </Button>
          )}
        />
        {errors.file?.message && (
          <FormHelperText>{errors.file.message}</FormHelperText>
        )}
      </FormControl>
      {/* mostriamo un'anteprima dell'immagine appena selezionata dall'utente */}
      {selectedFile && <img style={{ width: 50, height: 50 }} src={preview} />}
      {!!show && <Grid>Immagine inserita con successo!</Grid>}
      <AppButton
        loading={loading}
        style={{ marginLeft: "auto" }}
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      >
        Inserisci
      </AppButton>
    </Grid>
  );
}

export default CertificateForm;
