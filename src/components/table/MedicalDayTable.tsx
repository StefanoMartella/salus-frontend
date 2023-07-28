import {
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {
  MedicaDayControllerApi,
  MedicalDayDTO,
  PageMedicalDayDTO,
} from "../../api";
import MedicalDayState from "../shared/MedicalDayState";
import ServerSideTable from "./ServerSideTable";

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
  {
    field: "state",
    headerName: "Stato",
    flex: 1,
    renderCell: (value) => (
      <MedicalDayState state={value.row.statoMedicalDay} />
    ),
  },
];

function MedicalDayTable() {
  const navigate = useNavigate();

  return (
    <ServerSideTable<PageMedicalDayDTO, MedicalDayDTO>
      header="Elenco medical-days"
      columns={columns}
      onRowClick={(item: GridRowParams<MedicalDayDTO>) =>
        navigate(`/visits/${item.row.id}`)
      }
      queryKey="medical-days"
      queryFn={(paginationModel) =>
        new MedicaDayControllerApi().findAll3(
          {},
          { page: paginationModel.page, size: paginationModel.pageSize },
        )
      }
    />
  );
}

export default MedicalDayTable;
