import { useForm, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { useQueries } from "@tanstack/react-query";
import { SedeControllerApi, SedeDTO } from "../../api";
import { AxiosResponse } from "axios";
import AppButton from "../shared/AppButton";

export type MedicalDayFormValues = {
  province: string;
  doctor: string;
  date: string;
};

function MedicalDayForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MedicalDayFormValues>({
    defaultValues: {
      province: "",
      doctor: "",
      date: "",
    },
  });
  const [{ data: provinces }] = useQueries({
    queries: [
      {
        queryKey: ["provinces"],
        queryFn: () => new SedeControllerApi().findAll1(),
        select: (response: AxiosResponse<SedeDTO[]>) => response.data,
      },
    ],
  });

  return (
    <Grid container gap={3} padding={2}>
      <FormControl fullWidth error={!!errors.province}>
        <InputLabel id="province">Provincia</InputLabel>
        <Controller
          name="province"
          control={control}
          rules={{
            required: { value: true, message: "Questo campo è obbligatorio" },
          }}
          render={({ field: { value, onChange } }) => (
            <Select
              labelId="province"
              id="province"
              value={value}
              label="Provincia"
              placeholder="Seleziona provincia"
              onChange={onChange}
            >
              {provinces?.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.denominazione}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.province?.message && (
          <FormHelperText>{errors.province.message}</FormHelperText>
        )}
      </FormControl>
      <AppButton
        onClick={handleSubmit(
          (values) => console.log(values),
          () => console.error("Campi non validi"),
        )}
      >
        Crea
      </AppButton>
    </Grid>
  );
}

export default MedicalDayForm;
