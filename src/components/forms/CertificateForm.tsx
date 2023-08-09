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

export type CertificateFormValues = {
  eligibility: boolean;
  eligibilityRenew: Dayjs;
  prescription: string;
  file: string;
};

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
      file: "",
    },
  });

  return (
    <Grid container gap={3} padding={2}>
      <FormControl fullWidth error={!!errors.eligibility}>
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
                }}
              />
            </Button>
          )}
        />
        {errors.file?.message && (
          <FormHelperText>{errors.file.message}</FormHelperText>
        )}
      </FormControl>
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
