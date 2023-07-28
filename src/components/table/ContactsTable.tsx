import {
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { DipendenteControllerApi, DipendenteDTO } from "../../api";
import ServerSideTable from "./ServerSideTable";
import { useNavigate } from "react-router-dom";

const columns: GridColDef<DipendenteDTO>[] = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Nome",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<DipendenteDTO>) =>
      `${param.row.nome} ${param.row.cognome}`,
  },
  {
    field: "fiscalCode",
    headerName: "Codice fiscale",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<DipendenteDTO>) =>
      param.row.codiceFiscale,
  },
  {
    field: "birthday",
    headerName: "Data di nascita",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<DipendenteDTO>) =>
      param.row.dataNascita,
  },
];

function ContactsTable() {
  const navigate = useNavigate();

  return (
    <ServerSideTable
      header="Elenco contatti"
      queryKey="contacts-list"
      columns={columns}
      onRowClick={(item: GridRowParams<DipendenteDTO>) =>
        navigate(`/contacts/${item.row.id}`)
      }
      queryFn={({ page, pageSize }) =>
        new DipendenteControllerApi().findAll5({}, { page, size: pageSize })
      }
    />
  );
}

export default ContactsTable;
