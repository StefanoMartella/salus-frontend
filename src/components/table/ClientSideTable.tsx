import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DataGrid, DataGridProps, GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 5;

type Props = DataGridProps & {
  header?: string;
};

//Questo tipo di tabella gestisce la paginazione lato client e quindi viene usata quando si ha già una lista a disposizione
//In questo caso il componente prende la lista (rows) dal padre PatientsTable a sua volta dal padre MedicalDaysDetailsPage, tramite Props Drilling, quindi l'abbiamo già.
function ClientSideTable({ header, rows, ...rest }: Props) {
  console.log("Righe: ", rows.length);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  return rows?.length ? (
    <Grid container>
      {header ? (
        <Typography variant="h6" marginY={2} marginBottom={2}>
          {header}
        </Typography>
      ) : null}
      <Paper sx={{ height: "auto", width: "100%" }}>
        {/* qui la tabella ha già tutta la lista, e quando l'utente clicca su una pagina diversa, semplicemente mostra i nuovi elementi paginati. Non c'è nessuna chiamata al backend */}
        <DataGrid
          {...rest}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[DEFAULT_PAGE_SIZE, 10]}
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: {
                page: DEFAULT_PAGE,
                pageSize: DEFAULT_PAGE_SIZE,
              },
            },
          }}
        />
      </Paper>
    </Grid>
  ) : (
    <Grid>Nessuna visita medica in questo medical day</Grid>
  );
}

export default ClientSideTable;
