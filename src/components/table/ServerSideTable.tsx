import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DataGrid, DataGridProps, GridPaginationModel } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 5;

type Props<PageType> = Omit<DataGridProps, "rows"> & {
  header?: string;
  queryKey: string;
  queryFn: (
    paginationModel: GridPaginationModel,
  ) => Promise<AxiosResponse<PageType>>;
};

function ServerSideTable<
  PageType extends { totalElements?: number; content?: ItemType[] },
  ItemType,
>({ header, queryKey, queryFn, ...rest }: Props<PageType>) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: () => queryFn(paginationModel),
    select: (response) => response.data,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [paginationModel, refetch]);

  return data?.content?.length ? (
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
          loading={isLoading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[DEFAULT_PAGE_SIZE, 10]}
          rowCount={data.totalElements}
          rows={data?.content}
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
  ) : null;
}

export default ServerSideTable;
