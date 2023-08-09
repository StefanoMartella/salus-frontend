import {
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {
  MedicaDayControllerApi,
  MedicalDayDTO,
  PageMedicalDayDTO,
} from "../../api";
import MedicalDayState from "../shared/MedicalDayState";
import ServerSideTable, { ServerSideTableHandle } from "./ServerSideTable";
import { Ref, useImperativeHandle, forwardRef, useRef } from "react";
import dayjs from "dayjs";
import { LONG_DATE_FORMAT, SERVER_DATE_FORMAT } from "../../utils/date-utils";

const columns: GridColDef<MedicalDayDTO>[] = [
  { field: "id", headerName: "ID" },
  {
    field: "doctor",
    headerName: "Medico",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<MedicalDayDTO>) =>
      param.row.contratto.medico?.cognome,
  },
  {
    field: "province",
    headerName: "Provincia",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<MedicalDayDTO>) =>
      param.row.contratto.sede?.provincia,
  },
  {
    field: "state",
    headerName: "Stato",
    flex: 1,
    renderCell: (value) => (
      <MedicalDayState state={value.row.statoMedicalDay} />
    ),
  },
];

export type MedicalDaysTableHandle = {
  refetch: () => void;
};

const MedicalDayTable = (_: object, ref: Ref<MedicalDaysTableHandle>) => {
  const navigate = useNavigate();
  const tableRef = useRef<ServerSideTableHandle>(null);

  useImperativeHandle(ref, () => ({
    refetch: tableRef.current?.refetch ?? (() => null),
  }));

  return (
    <ServerSideTable<PageMedicalDayDTO, MedicalDayDTO>
      ref={tableRef}
      header="Elenco medical-days"
      columns={columns}
      onRowClick={(item: GridRowParams<MedicalDayDTO>) =>
        navigate(`/visits/${item.row.id}`, {
          state: {
            title: `Medical Day - ${dayjs(
              item.row.data,
              SERVER_DATE_FORMAT,
            ).format(LONG_DATE_FORMAT)}`,
            subTitle: `Medico: ${item.row.contratto.medico?.nome} ${item.row.contratto.medico?.cognome}`,
          },
        })
      }
      queryKey={["medical-days"]}
      queryFn={(paginationModel) =>
        new MedicaDayControllerApi().findAll3(
          {},
          { page: paginationModel.page, size: paginationModel.pageSize },
        )
      }
    />
  );
};

export default forwardRef(MedicalDayTable);
