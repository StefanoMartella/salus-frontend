import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Dipendente, DipendenteDTO } from "../../api";
import AttachmentHandler from "../shared/AttachmentHandler";
import PatientState from "../shared/PatientState";
import ClientSideTable from "./ClientSideTable";
import { useNavigate } from "react-router-dom";
export type EmployeeInfo = Dipendente & {
  visitId: number;
  attachmentId: string | null;
};

const columns: GridColDef<EmployeeInfo>[] = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Nome",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<EmployeeInfo>) =>
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
    valueGetter: (param: GridValueGetterParams<EmployeeInfo>) =>
      param.row.mansione,
  },
  {
    field: "attachments",
    headerName: "Allegati",
    flex: 1,
    renderCell: (param: GridRenderCellParams<EmployeeInfo>) => (
      <AttachmentHandler
        attachmentId={param.row.attachmentId}
        visitId={param.row.visitId}
      />
    ),
  },
];

type Props = {
  patients: EmployeeInfo[];
};

function PatientsTable({ patients }: Props) {
  const navigate = useNavigate();
  return (
    <ClientSideTable
      onRowClick={(item: GridRowParams<DipendenteDTO>) =>
        navigate(`/contacts/${item.row.id}`, {
          state: {
            isDoctor: false,
            nome: item.row.nome,
            cognome: item.row.cognome,
            sedeDenominazione: item.row.sede?.denominazione,
            provincia: item.row.sede?.provincia,
          },
        })
      }
      header="Pazienti"
      rows={patients}
      columns={columns}
    />
  );
}

export default PatientsTable;
