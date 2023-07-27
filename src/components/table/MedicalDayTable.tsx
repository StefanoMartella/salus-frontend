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

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 5;

const columns: GridColDef<MedicalDayDTO>[] = [
  { field: "id", headerName: "ID" },
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
  const navigate = useNavigate();
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
          onRowClick={(item: GridRowParams<MedicalDayDTO>) =>
            navigate(`/visits/${item.row.id}`)
          }
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
