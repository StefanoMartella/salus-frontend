import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DataGrid, DataGridProps, GridPaginationModel } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
} from "react";

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 5;

type Props<PageType> = Omit<DataGridProps, "rows"> & {
  header?: string;
  queryKey: string;
  queryFn: (
    paginationModel: GridPaginationModel,
  ) => Promise<AxiosResponse<PageType>>;
};

type PagedResponse<ItemType> = {
  totalElements?: number;
  content?: ItemType[];
};

export type ServerSideTableHandle = {
  refetch: () => void;
};

const ServerSideTable = forwardRef(
  <PageType extends PagedResponse<ItemType>, ItemType>(
    { header, queryKey, queryFn, ...rest }: Props<PageType>,
    ref: Ref<ServerSideTableHandle>,
  ) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
      {
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
      },
    );
    const { data, refetch, isRefetching } = useQuery({
      queryKey: [queryKey],
      queryFn: () => queryFn(paginationModel),
      select: (response) => response.data,
      enabled: false,
    });

    useImperativeHandle(ref, () => ({ refetch }));

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
            rows={data?.content}
            rowCount={data.totalElements}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            paginationMode="server"
            loading={isRefetching}
            initialState={{
              pagination: {
                paginationModel: {
                  page: DEFAULT_PAGE,
                  pageSize: DEFAULT_PAGE_SIZE,
                },
              },
            }}
            pageSizeOptions={[DEFAULT_PAGE_SIZE, 10]}
          />
        </Paper>
      </Grid>
    ) : null;
  },
);

ServerSideTable.displayName = "ServerSideTable";

export default ServerSideTable as <
  PageType extends PagedResponse<PageItem>,
  PageItem,
>(
  props: Props<PageType> & { ref?: Ref<ServerSideTableHandle> },
) => JSX.Element;
