import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { deepOrange } from "@mui/material/colors";
import {
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { DipendenteControllerApi, DipendenteDTO } from "../../api";
import ServerSideTable from "./ServerSideTable";

const columns: GridColDef<DipendenteDTO>[] = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Nome",
    flex: 1,
    renderCell: (value) => (
      <Grid container direction="row" gap={1} alignItems="center">
        <Avatar
          style={{
            color: "white",
            backgroundColor: deepOrange[400],
            width: 33,
            height: 33,
          }}
        >
          <Typography variant="body2">
            {value.row.nome?.charAt(0)}
            {value.row.cognome?.charAt(0)}
          </Typography>
        </Avatar>
        {value.row.nome} {value.row.cognome}
      </Grid>
    ),
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
