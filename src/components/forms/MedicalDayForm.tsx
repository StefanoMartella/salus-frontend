import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers";
import { useQueries } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Dayjs } from "dayjs";
import { useEffect } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  ContrattoControllerApi,
  DipendenteControllerApi,
  PageContrattoDTO,
  PageDipendenteDTO,
  SedeControllerApi,
  SedeDTO,
} from "../../api";
import { DISPLAYED_DATE_FORMAT } from "../../utils/date-utils";
import { VALIDATION } from "../../utils/validation";
import AppButton from "../shared/AppButton";

export type MedicalDayFormValues = FieldValues & {
  province: string;
  contract: string;
  date: Dayjs;
  patients: string[];
};

type Props = {
  onSubmit: SubmitHandler<MedicalDayFormValues>;
  loading: boolean;
};

function MedicalDayForm({ loading, onSubmit }: Props) {
  const {
    watch,
    control,
    handleSubmit,
    getValues,
    resetField,
    formState: { errors },
  } = useForm<MedicalDayFormValues>({
    defaultValues: {
      province: "",
      contract: "",
      date: "",
      patients: [],
    },
  });
  const { append, remove } = useFieldArray({
    control,
    name: "patients",
    rules: VALIDATION.medicalDay.patients,
  });
  const [
    { data: provinces, isLoading: areProvincesLoading },
    { data: contracts, isLoading: areContractsLoading },
    { data: patients, isRefetching: arePatientsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["provinces"],
        queryFn: () => new SedeControllerApi().findAll1(),
        select: (response: AxiosResponse<SedeDTO[]>) => response.data,
      },
      {
        queryKey: ["contracts", getValues("province")],
        queryFn: () =>
          new ContrattoControllerApi().findAll6(
            {
              sedeId: { equals: parseInt(getValues("province")) },
            },
            { page: 0, size: 100 },
          ),
        select: (response: AxiosResponse<PageContrattoDTO>) => response.data,
        enabled: !!getValues("province"),
      },
      {
        queryKey: ["patients-for-medical-days", getValues("province")],
        queryFn: () =>
          new DipendenteControllerApi().findAll5(
            {
              idSede: { equals: parseInt(getValues("province")) },
            },
            { page: 0, size: 10 },
          ),
        select: (response: AxiosResponse<PageDipendenteDTO>) => response.data,
        enabled: !!getValues("province"),
      },
    ],
  });

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === "province") {
        resetField("contract");
        resetField("patients");
      }
    });

    return () => subscription.unsubscribe();
  }, [resetField, watch]);

  return (
    <Grid container gap={3} padding={2}>
      <FormControl fullWidth error={!!errors.province}>
        <InputLabel id="province">Provincia</InputLabel>
        <Controller
          name="province"
          control={control}
          rules={VALIDATION.medicalDay.province}
          render={({ field: { value, onChange } }) => (
            <Select
              labelId="province"
              id="province"
              value={value}
              label="Provincia"
              disabled={areProvincesLoading}
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
      <FormControl fullWidth error={!!errors.contract}>
        <InputLabel id="contract">Medico</InputLabel>
        <Controller
          name="contract"
          control={control}
          rules={VALIDATION.medicalDay.contract}
          render={({ field: { value, onChange } }) => (
            <Select
              labelId="contract"
              id="contract"
              value={value}
              label="Medico"
              disabled={areContractsLoading || areProvincesLoading}
              placeholder="Seleziona medico"
              onChange={onChange}
            >
              {contracts?.content?.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.medico?.nome} {d.medico?.cognome}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.contract?.message && (
          <FormHelperText>{errors.contract.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth error={!!errors.date}>
        <Controller
          name="date"
          control={control}
          rules={VALIDATION.medicalDay.date}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              value={value}
              onChange={onChange}
              label="Data"
              format={DISPLAYED_DATE_FORMAT}
              slotProps={{ textField: { error: !!errors.date?.message } }}
            />
          )}
        />
        {errors.date?.message && (
          <FormHelperText>{errors.date.message}</FormHelperText>
        )}
      </FormControl>
      {arePatientsLoading ? (
        <CircularProgress />
      ) : (
        <Grid container>
          <FormGroup>
            {patients?.content?.map((p, i) => (
              <FormControlLabel
                key={p.id}
                label={`${p.nome} ${p.cognome}`}
                control={
                  <Checkbox
                    value={p.id}
                    onChange={(_, value) =>
                      value ? append(`${p.id}`) : remove(i)
                    }
                  />
                }
              />
            ))}
          </FormGroup>
        </Grid>
      )}
      <AppButton
        loading={loading}
        style={{ marginLeft: "auto" }}
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      >
        Crea
      </AppButton>
    </Grid>
  );
}

export default MedicalDayForm;
