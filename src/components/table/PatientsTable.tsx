import { Dipendente } from "../../api";
import ClientSideTable from "./ClientSideTable";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

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
      onRowClick={() => navigate(`/contacts`)}
      header="Pazienti"
      rows={patients}
      columns={columns}
    />
  );
}

export default PatientsTable;
