import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useQueries } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Controller, useForm } from "react-hook-form";
import {
  ContrattoControllerApi,
  PageContrattoDTO,
  SedeControllerApi,
  SedeDTO,
} from "../../api";
import AppButton from "../shared/AppButton";

//impostiamo i tipi dei valori che saranno inseriti dentro le input del form, ovviamente string
export type MedicalDayFormValues = {
  province: string;
  doctor: string;
  date: string;
};

//componente del form
function MedicalDayForm() {
  //useForm restituisce l'oggetto formState, la funzione handleSubmit e l'oggetto control. Quest'ultimo è utile per la gestione degli stati di input del form e per le validazioni. Sotto viene assegnato alla props control di <Controller> per collegare il campo input "province" al form
  //settiamo poi i valori di default delle stringhe dei campi di input
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

  //qui ci servono più queries, quindi usiamo useQueries. Ad esempio provinces restituisce una risposta di tipo AxiosResponse (quindi una risposta Axios) precisamente di tipo SedeDTO array
  const [{ data: provinces }, { data: doctors }] = useQueries({
    queries: [
      {
        queryKey: ["provinces"],
        queryFn: () => new SedeControllerApi().findAll1(),
        //la findAll restituisce direttamente un array di Sedi DTO, perche nel backend abbiamo deciso di non paginare la lista delle sedi
        select: (response: AxiosResponse<SedeDTO[]>) => response.data,
      },
      {
        queryKey: ["doctors"],
        queryFn: () => new ContrattoControllerApi().findAll6({}, {}),
        //la findAll (puoi controllare) qui restituisce un oggetto PageContrattoDTO, che contiene vari attributi, tra cui il content che contiene un array di ContrattoDTO
        select: (response: AxiosResponse<PageContrattoDTO>) => response.data,
      },
    ],
  });

  return (
    <Grid container gap={3} padding={2}>
      {/* l'operatore !! serve per trasformare un valore in booleano: Se errors.province contiene un messaggio di errore (quindi è diverso da undefined), !!errors.province sarà true. Se errors.province è undefined (cioè il campo è valido), !!errors.province sarà false.*/}
      <FormControl fullWidth error={!!errors.province}>
        <InputLabel id="province">Provincia</InputLabel>
        <Controller
          name="province"
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
            </>
          )}
        />
        {errors.province?.message && (
          // questo serve per far comparire il messaggio di errore
          <FormHelperText>{errors.province.message}</FormHelperText>
        )}
      </FormControl>
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
                {doctors?.content?.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {`${d.medico?.nome} ${d.medico?.cognome}, Scadenza contratto ${d.dataFine}`}
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
      <AppButton
        // a quanto pare handleSubmit sà già di dover chiamare la prima funzione solo in caso di form inviato con successo, e la seconda funzione se fallito il submit
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
