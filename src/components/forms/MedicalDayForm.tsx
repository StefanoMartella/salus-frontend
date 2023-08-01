import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useQueries } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Controller, useForm } from "react-hook-form";
import { getFormattedDate } from "../../utils/date-utils";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";

import {
  ContrattoControllerApi,
  DipendenteControllerApi,
  PageContrattoDTO,
  RangeFilterLocalDate,
  SedeControllerApi,
  SedeDTO,
} from "../../api";
import AppButton from "../shared/AppButton";
import { useState, useEffect } from "react";

export type MedicalDayFormValues = {
  province: string;
  doctor: string;
  date: string;
};

function MedicalDayForm() {
  const [idProvincia, setIdProvincia] = useState("");
  const [idDottore, setIdDottore] = useState("");

  const theme = useTheme();

  const [attivo, setAttivo] = useState(true);
  const datafutura = new Date();
  datafutura.setMonth(datafutura.getMonth() + 3);
  datafutura.setFullYear(datafutura.getFullYear() + 5);

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
  const [
    { data: provinces },
    { data: doctors, refetch: refetchDoctors },
    { data: employees, refetch: refetchEmployees },
  ] = useQueries({
    queries: [
      {
        queryKey: ["provinces"],
        queryFn: () => new SedeControllerApi().findAll1(),
        select: (response: AxiosResponse<SedeDTO[]>) => response.data,
      },
      {
        queryKey: ["doctors"],
        queryFn: () =>
          new ContrattoControllerApi().findAll6(
            { sedeId: { equals: idProvincia as unknown as number } },
            {},
          ),
        select: (response: AxiosResponse<PageContrattoDTO>) => response.data,
        enabled: false,
      },
      {
        queryKey: ["employees"],
        queryFn: () =>
          new DipendenteControllerApi().findAll5(
            {
              idSede: { equals: idProvincia as unknown as number },
              scadenzaVisitaAl: {
                //date scadute entro il
                lessOrEqualThan: getFormattedDate(
                  datafutura,
                ) as unknown as RangeFilterLocalDate,
              },
            },
            { page: 0, size: 20 },
          ),
      },
    ],
  });

  useEffect(() => {
    refetchDoctors();
  }, [idProvincia, refetchDoctors]);

  useEffect(() => {
    refetchEmployees();
  }, [idDottore, refetchEmployees]);

  return (
    <>
      <Grid container gap={3} padding={2}>
        <FormControl error={!!errors.province} style={{ flexGrow: 1 }}>
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
                onChange={(event) => {
                  onChange(event.target.value);
                  setIdProvincia(event?.target.value);
                  setAttivo(false);
                  console.log("Id provincia:", event?.target.value);
                }}
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
        <FormControl
          error={!!errors.doctor}
          style={{ minWidth: "700px", flexGrow: 1 }}
        >
          <InputLabel id="doctor">Medico</InputLabel>
          <Controller
            name="doctor"
            control={control}
            rules={{
              required: { value: true, message: "Questo campo è obbligatorio" },
            }}
            render={({ field: { value, onChange } }) => (
              <Select
                labelId="doctor"
                id="doctor"
                value={value}
                label="Medico"
                placeholder="Seleziona medico"
                disabled={attivo}
                onChange={(event) => {
                  onChange(event.target.value);
                  setIdDottore(event?.target.value);
                }}
              >
                {doctors?.content?.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.medico?.nome} {d.medico?.cognome}{" "}
                    {", Scadenza contratto: "} {d.dataFine}{" "}
                    {d.sede?.denominazione}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.province?.message && (
            <FormHelperText>{errors.province.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid container>
        <Grid style={{ width: "50%" }}></Grid>
        <Grid style={{ minHeight: "60vh", width: "50%" }}>
          <FormGroup style={{ display: "flex", alignItems: "baseline" }}>
            {idDottore !== "" &&
              employees?.data.content?.map((employee, index) => (
                <Card
                  style={{
                    width: "100%",
                    margin: theme.spacing(1),
                  }}
                  key={index}
                >
                  <CardContent
                    style={{
                      backgroundColor: theme.palette.grey[300],
                    }}
                  >
                    <FormControlLabel
                      control={<Checkbox />}
                      label={`
                  ${employee.cognome} ${employee.nome}  ${employee.scadenzaVisita} ${employee.sede?.denominazione}
                `}
                    />
                  </CardContent>
                </Card>
              ))}
          </FormGroup>
        </Grid>
      </Grid>

      <AppButton
        onClick={handleSubmit(
          (values) => console.log(values),
          () => console.error("Campi non validi"),
        )}
      >
        Crea
      </AppButton>
    </>
  );
}

export default MedicalDayForm;
