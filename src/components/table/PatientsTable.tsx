import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Dipendente } from "../../api";
import AttachmentHandler from "../shared/AttachmentHandler";
import PatientState from "../shared/PatientState";
import ClientSideTable from "./ClientSideTable";

type DipendenteInfo = Dipendente & {
  visitId: number;
  attachmentId: string | null;
};

const columns: GridColDef<DipendenteInfo>[] = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Nome",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<DipendenteInfo>) =>
      `${param.row.nome} ${param.row.cognome}`,
  },
  {
    field: "state",
    headerName: "Stato",
    flex: 1,
    renderCell: (param: GridRenderCellParams<Dipendente>) => (
      <PatientState state={param.row.statoAssunzione} />
    ),
  },
  {
    field: "task",
    headerName: "Mansione",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<DipendenteInfo>) =>
      param.row.mansione,
  },
  {
    field: "attachments",
    headerName: "Allegati",
    flex: 1,
    renderCell: (param: GridRenderCellParams<DipendenteInfo>) => (
      <AttachmentHandler
        attachmentId={param.row.attachmentId}
        visitId={param.row.visitId}
      />
    ),
  },
];

type Props = {
  patients: DipendenteInfo[];
};

function PatientsTable({ patients }: Props) {
  return (
    <ClientSideTable header="Pazienti" rows={patients} columns={columns} />
  );
}

export default PatientsTable;
