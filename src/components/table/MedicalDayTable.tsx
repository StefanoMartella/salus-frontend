import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MedicaDayControllerApi, MedicalDayDTO } from "../../api";
import { MedicalDayDTOStatoMedicalDayEnum } from "../../api/models/medical-day-dto";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//settiamo valori iniziali di pagina e numero di elementi che vogliamo visualizzare nella tabella
const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 5;

//definiamo le colonne che verranno inserite nella nostra tabella
const columns: GridColDef<MedicalDayDTO>[] = [
  { field: "id", headerName: "ID" },
  //valueGetter va a inserire tanti valori nella tabella quanti ne trova dal backend.
  //row corrisponde all'oggetto che abbiamo indicato come Generics nel GridColDef<>, quindi in sto caso MedicalDayDTO
  {
    field: "doctor",
    headerName: "Medico",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<MedicalDayDTO>) =>
      param.row.contratto.medico?.cognome,
  },
  {
    field: "province",
    headerName: "Provincia",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<MedicalDayDTO>) =>
      param.row.contratto.sede?.provincia,
  },
  // {
  //   field: "totalVisits",
  //   headerName: "Totale visite",
  //   flex: 1,
  //   valueGetter: (param: GridValueGetterParams<MedicalDayDTO>) =>
  //     param.row.visiteMediche?.length || 0,
  // },

  //Se valueGetter serve solo per ottenere e scrivere un valore nella cella, renderCell invece è una funzione utilizzata per personalizzare
  //l'aspetto della cella durante la visualizzazione dei dati, infatti in questo caso abbiamo renderizzato un componente Chip
  {
    field: "state",
    headerName: "Stato",
    flex: 1,
    renderCell: (value) => (
      <Chip
        label={
          value.row.statoMedicalDay ===
          MedicalDayDTOStatoMedicalDayEnum.COMPLETO
            ? "Completo"
            : "In lavorazione"
        }
        color={
          value.row.statoMedicalDay ===
          MedicalDayDTOStatoMedicalDayEnum.COMPLETO
            ? "success"
            : "warning"
        }
      />
    ),
  },
];

//component della tabella
function MedicalDayTable() {
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["medical-days"],
    queryFn: () =>
      new MedicaDayControllerApi().findAll3(
        {}, //vuole due parametri, ma il primo non passiamo nulla
        { page: paginationModel.page, size: paginationModel.pageSize },
      ),
    select: (response) => response.data, //questo ci evita di dover fare data.data, così data corrisponde direttamente al suo contenuto, ossia la lista di medical days
    enabled: false, //evitiamo l'esecuzione della query automatica quando il componente è montato o cambiano le dipendenze, e decidiamo di gestirlo con una useEffect
  });

  useEffect(() => {
    refetch();
  }, [paginationModel, refetch]);

  return (
    <Paper sx={{ height: "auto", width: "100%" }}>
      {data?.content?.length && (
        <DataGrid
          paginationMode="server" //la paginazione è gestita lato server: il client vede una pagina con tot elementi, se clicca su altra pagina, effettua nuova richiesta al server, che fornisce la nuova pagina
          loading={isLoading}
          paginationModel={paginationModel} //setta che la pagina iniziale è la 0 con 5 elementi a vista
          onPaginationModelChange={setPaginationModel} //se l'utente cambia la pagina o il numero di elementi da visualizzare, si innesca il metodo e ri-setta paginationModel con questi valori
          pageSizeOptions={[DEFAULT_PAGE_SIZE, 10]}
          rowCount={data.totalElements} //numero di medicalDays presenti
          rows={data?.content}
          columns={columns} //inseriamo le colonne definite sopra
          onRowClick={(item: GridRowParams<MedicalDayDTO>) =>
            navigate(`/visits/${item.row.id}`)
          } //al click di tutta la riga di un medical day, si entra nel dettaglio di quel preciso medical day, cosi non si deve cliccare proprio sulla scritta del suo id
          initialState={{
            //definisci stato iniziale(??)
            pagination: {
              paginationModel: {
                page: DEFAULT_PAGE,
                pageSize: DEFAULT_PAGE_SIZE,
              },
            },
          }}
        />
      )}
    </Paper>
  );
}

export default MedicalDayTable;
