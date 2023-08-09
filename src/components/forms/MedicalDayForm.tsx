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
import { VALIDATION } from "../../utils/validation";
import AppButton from "../shared/AppButton";

export type MedicalDayFormValues = FieldValues & {
  province: string;
  contract: string;
  date: Dayjs;
  patients: string[];
};

//submitHandler (se guardi) prevede una funzione che prende in input un oggetto con props {data e event?} in cui data vuole il tipo passato nel generics. La funzione restituisce una Promise di tipo unknown
type Props = {
  onSubmit: SubmitHandler<MedicalDayFormValues>;
  loading: boolean;
};

//prende i props da MedicalDaysPage
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

  //lo useFieldArray lo usiamo per gestire l'array patients[], per aggiungere o rimuovere elementi
  //le rules delle validazioni sono fatte in un altro file
  const { append, remove } = useFieldArray({
    control,
    name: "patients",
    rules: VALIDATION.medicalDay.patients,
  });

  //creiamo le query per le find
  const [
    { data: provinces, isLoading: areProvincesLoading },
    { data: contracts, isLoading: areContractsLoading },
    { data: patients, isRefetching: arePatientsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["provinces"],
        queryFn: () => new SedeControllerApi().findAll1(),
        //la findAll restituisce direttamente un array di Sedi DTO, perche nel backend abbiamo deciso di non paginare la lista delle sedi
        select: (response: AxiosResponse<SedeDTO[]>) => response.data,
      },
      {
        queryKey: ["contracts", getValues("province")],
        queryFn: () =>
          new ContrattoControllerApi().findAll6(
            {
              //il getValues prende il value dell'option selezionata dentro la select. "province" è preso dallo useForm
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

  //il watch è uno state change listener, osserva cioè se ci sono cambiamenti in alcuni stati. In particolare qui controlla se cambia lo stato di province (ossia viene selezionata diversa opzione nella select delle sedi), allora esegue quelle funzioni, ossia refetcha le query
  //watch prende due input: una funzione di callback (che a noi in sto caso non serve) e il valore da osservare
  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === "province") {
        resetField("contract");
        resetField("patients");
      }
    });

    //questa è una funzione di cleanUp per evitare memory leaks quando il componente è unmounted
    return () => subscription.unsubscribe();
  }, [resetField, watch]);

  return (
    <Grid container gap={3} padding={2}>
      {/* l'operatore !! serve per trasformare un valore in booleano: Se errors.province contiene un messaggio di errore (quindi è diverso da undefined), !!errors.province sarà true. Se errors.province è undefined (cioè il campo è valido), !!errors.province sarà false.*/}
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
          // questo serve per far comparire il messaggio di errore
          <FormHelperText>{errors.province.message}</FormHelperText>
        )}
      </FormControl>
      {/* !!errors.doctor controlla: se c'è un messaggio, allora il primo ! rende come valore false, il secondo ! lo rirende true */}
      <FormControl fullWidth error={!!errors.doctor}>
        <InputLabel id="doctor">Dottore</InputLabel>
        <Controller
          name="doctor" //sia qui nel name che nell'id sopra va messo come valore la prop scritta nel tipo MedicalDayFormValues in alto all'inizio
          control={control}
          rules={{
            required: { value: true, message: "Questo campo è obbligatorio" },
          }}
          // il render serve a specificare una funzione che renderizzerà il componente Select, e passa delle props attraverso l'oggetto field (si poteva lasciare anche solo field e sotto fare field.value e field.onChange)
          //value indica il value del campo di input attuale (ossia il value dell'option della select selezionato al momento)
          //onChange: quando l'utente selezionerà altro option della select, onChange si occuperà di aggiornare il valore nel value
          render={({ field: { value, onChange } }) => (
            <>
              <Select
                labelId="doctor"
                id="doctor"
                value={value}
                label="Dottori"
                placeholder="Seleziona dottore"
                onChange={onChange}
              >
                {contracts?.content?.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {`${c.medico?.nome} ${c.medico?.cognome}, Scadenza contratto ${c.dataFine}`}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        />
        {errors.province?.message && (
          // questo serve per far comparire il messaggio di errore
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
              format="DD-MM-YYYY"
              //slotProps serve per la parte dell'error, da solo (come abbiam fatto negli altri) qui non funziona
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
                    //questo serve per aggiungere o rimuovere gli id dei dipendenti delle checkbox selezionate all'array patients[], usando i metodi append e remove di useFieldArray
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
