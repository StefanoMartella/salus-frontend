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
import {
  DipendenteControllerApi,
  DipendenteDTO,
  PageDipendenteDTO,
} from "../../api";
import { ContactTableFilters } from "../../pages/contacts/ContactPage";
import ServerSideTable, { ServerSideTableProps } from "./ServerSideTable";

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

type Props = Omit<
  ServerSideTableProps<PageDipendenteDTO>,
  "columns" | "queryKey" | "queryFn"
> & {
  filters: ContactTableFilters;
};

function EmployeesTable({ filters, ...rest }: Props) {
  const navigate = useNavigate();

  return (
    <ServerSideTable<PageDipendenteDTO, DipendenteDTO>
      header="Elenco contatti"
      queryKey={["contacts-list", filters]}
      columns={columns}
      onRowClick={(item: GridRowParams<DipendenteDTO>) =>
        navigate(`/contacts/${item.row.id}`, { state: { doctor: false } })
      }
      queryFn={({ page, pageSize }) =>
        new DipendenteControllerApi().findAll5(
          filters.query
            ? {
                nome: { contains: filters.query },
              }
            : {},
          { page, size: pageSize },
        )
      }
      {...rest}
    />
  );
}

export default EmployeesTable;
