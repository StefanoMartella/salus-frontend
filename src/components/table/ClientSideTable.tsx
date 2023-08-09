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
