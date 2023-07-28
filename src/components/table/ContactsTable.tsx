import React from "react";
import { Dipendente, DipendenteDTO } from "../../api";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import ServerSideTable from "./ServerSideTable";

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
    field: "email",
    headerName: "Email",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<Dipendente>) => param.row.email,
  },
  {
    field: "task",
    headerName: "Mansione",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<Dipendente>) =>
      param.row.mansione,
  },
  {
    field: "sede",
    headerName: "Sede",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<Dipendente>) =>
      param.row.sede?.denominazione,
  },
];

type Props = {
  patients: DipendenteDTO[];
  pageSize?: number;
  pageNumber?: number;
};

function ContactsTable({ patients }: Props) {
  return (
    <ServerSideTable header="Contatti" rows={patients} columns={columns} />
  );
}

export default ContactsTable;
