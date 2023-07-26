import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MedicaDayControllerApi, MedicalDayDTO } from "../../api";
import { MedicalDayDTOStatoMedicalDayEnum } from "../../api/models/medical-day-dto";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 5;

const columns: GridColDef<MedicalDayDTO>[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    renderCell: (params) => (
      <Link to={`/visit/${params.value}`}>{params.value}</Link>
    ),
  },
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
  // ... altre colonne
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

function MedicalDayTable() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["medical-days"],
    queryFn: () =>
      new MedicaDayControllerApi().findAll3(
        {},
        { page: paginationModel.page, size: paginationModel.pageSize },
      ),
    select: (response) => response.data,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [paginationModel, refetch]);

  return (
    <Paper sx={{ height: "auto", width: "100%" }}>
      {data?.content?.length && (
        <DataGrid
          paginationMode="server"
          loading={isLoading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[DEFAULT_PAGE_SIZE, 10]}
          rowCount={data.totalElements}
          rows={data?.content}
          columns={columns}
          initialState={{
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
