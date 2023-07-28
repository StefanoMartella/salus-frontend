import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { DipendenteControllerApi, DipendenteDTO } from "../../api";
import ServerSideTable from "./ServerSideTable";

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
  return (
    <ServerSideTable
      header="Elenco contatti"
      queryKey="contacts-list"
      columns={columns}
      queryFn={({ page, pageSize }) =>
        new DipendenteControllerApi().findAll5({}, { page, size: pageSize })
      }
    />
  );
}

export default ContactsTable;