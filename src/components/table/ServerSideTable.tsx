import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DataGrid, DataGridProps, GridPaginationModel } from "@mui/x-data-grid";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Ref, forwardRef, useImperativeHandle, useState } from "react";
import { useUpdateEffect } from "../../hooks/useUpdateEffect";

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 5;

export type ServerSideTableProps<PageType> = Omit<DataGridProps, "rows"> & {
  header?: string;
  queryKey: QueryKey;
  queryFn: (
    paginationModel: GridPaginationModel,
  ) => Promise<AxiosResponse<PageType>>;
  renderAboveTable?: () => JSX.Element;
};

type PagedResponse<ItemType> = {
  totalElements?: number;
  content?: ItemType[];
};

export type ServerSideTableHandle = {
  refetch: () => void;
};

//Questo tipo di tabella gestisce la paginazione lato server e quindi viene usata quando vogliamo che ad ogni click dell'utente su una pagina diversa della tabella, ci sia una nuova fetch al backend
//il componente prende in input dal padre una funzione queryFn(paginationModel) che vuole in input un oggetto di tipo paginationModel che prevede le props page e pageSize
const ServerSideTable = forwardRef(
  <PageType extends PagedResponse<ItemType>, ItemType>(
    {
      header,
      queryKey,
      queryFn,
      renderAboveTable,
      ...rest
    }: ServerSideTableProps<PageType>,
    ref: Ref<ServerSideTableHandle>,
  ) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
      { page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE },
    );

    //la queryKey dice che se il valore di paginationModel cambia, ossia quando l'utente clickerà su una nuova pagina della table, la query verrà refetchata con i nuovi valori di paginationModel
    const { data, refetch, isRefetching } = useQuery({
      queryKey: [...queryKey, paginationModel],
      queryFn: () => queryFn(paginationModel),
      select: (response) => response.data,
    });

    useImperativeHandle(ref, () => ({ refetch }));

    useUpdateEffect(() => {
      setPaginationModel((oldPaginationModel) => ({
        ...oldPaginationModel,
        page: 0,
      }));
    }, [queryFn]);

    return (
      <Grid container>
        {header ? (
          <Typography variant="h6" marginY={2} marginBottom={2}>
            {header}
          </Typography>
        ) : null}
        {renderAboveTable?.()}
        {data?.content?.length ? (
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
        ) : (
          <Typography style={{ width: "100%" }} textAlign="center">
            Nessun risultato
          </Typography>
        )}
      </Grid>
    );
  },
);

ServerSideTable.displayName = "ServerSideTable";

export default ServerSideTable as <
  PageType extends PagedResponse<PageItem>,
  PageItem,
>(
  props: ServerSideTableProps<PageType> & { ref?: Ref<ServerSideTableHandle> },
) => JSX.Element;
