import { useNavigate } from "react-router-dom";
import { Dipendente, DipendenteDTO } from "../../api";
import ClientSideTable from "./ClientSideTable";
import {
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";

const columns: GridColDef<Dipendente>[] = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Nome",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<Dipendente>) =>
      `${param.row.nome} ${param.row.cognome}`,
  },
  {
    field: "state",
    headerName: "Stato",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<Dipendente>) =>
      param.row.statoAssunzione,
  },
  {
    field: "task",
    headerName: "Mansione",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<Dipendente>) =>
      param.row.mansione,
  },
  {
    field: "attachments",
    headerName: "Allegati",
    flex: 1,
    valueGetter: () => "-",
  },
];

type Props = {
  patients: Dipendente[];
};

function PatientsTable({ patients }: Props) {
  const navigate = useNavigate();

  return (
    <ClientSideTable
      header="Pazienti"
      rows={patients}
      columns={columns}
      onRowClick={(item: GridRowParams<DipendenteDTO>) =>
        navigate(`/contacts/${item.row.id}`)
      }
    />
  );
}

export default PatientsTable;
