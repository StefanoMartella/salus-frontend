import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  PageVisitaMedicaDTO,
  VisitaMedicaControllerApi,
  VisitaMedicaDTO,
  VisitaMedicaDTOStatoVisitaMedicaEnum,
} from "../../api";
import MedicalVisitState from "../shared/MedicalVisitState";
import ServerSideTable from "./ServerSideTable";

const columns: GridColDef<VisitaMedicaDTO>[] = [
  { field: "id", headerName: "ID" },
  {
    field: "patient",
    headerName: "Paziente",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<VisitaMedicaDTO>) =>
      `${param.row.dipendente?.nome} ${param.row.dipendente?.cognome}`,
  },
  {
    field: "hour",
    headerName: "Ora visita",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<VisitaMedicaDTO>) =>
      param.row.oraVisita,
  },
  {
    field: "state",
    headerName: "State",
    flex: 1,
    renderCell: (value) => (
      <MedicalVisitState
        state={
          value.row.statoVisitaMedica as VisitaMedicaDTOStatoVisitaMedicaEnum
        }
      />
    ),
  },
];

type Props = {
  patientId: string;
};

function VisitsTable({ patientId }: Props) {
  return (
    <ServerSideTable<PageVisitaMedicaDTO, VisitaMedicaDTO>
      header="Visite mediche"
      queryKey={["medical-visits", patientId]}
      columns={columns}
      queryFn={({ page, pageSize }) =>
        new VisitaMedicaControllerApi().findAll(
          {
            idDipendente: { equals: patientId as unknown as number },
          },
          { page, size: pageSize },
        )
      }
    />
  );
}

export default VisitsTable;
