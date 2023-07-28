import { Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid, DataGridProps, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 1;

type Props = DataGridProps & {
  header?: string;
};
function ServerSideTable({ header, rows, ...rest }: Props) {
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  return (
    <Grid container>
      {header ? (
        <Typography variant="h6" marginY={2} marginBottom={2}>
          {header}
        </Typography>
      ) : null}
      <Paper sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          {...rest}
          paginationMode="server"
          rows={rows}
          onRowClick={() => navigate(`/contacts`)}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[DEFAULT_PAGE_SIZE, 5]}
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
  );
}

export default ServerSideTable;
