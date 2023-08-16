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

//definiamo le colonne che verranno inserite nella nostra tabella
const columns: GridColDef<MedicalDayDTO>[] = [
  { field: "id", headerName: "ID" },
  //valueGetter va a inserire tanti valori nella tabella quanti ne trova dal backend.
  //row corrisponde all'oggetto che abbiamo indicato come Generics nel GridColDef<>, quindi in sto caso MedicalDayDTO
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
  {
    field: "data-medical-day",
    headerName: "Data",
    flex: 1,
    valueGetter: (param: GridValueGetterParams<MedicalDayDTO>) =>
      param.row.data,
  },
];

//definiamo il type del ref
export type MedicalDaysTableHandle = {
  refetch: () => void;
};

//la table prende due props in input: un oggetto non utilizzato (e quindi scritto con convenzione underscore) e poi un ref, che è una funzione che restituisce void
const MedicalDayTable = (_: object, ref: Ref<MedicalDaysTableHandle>) => {
  const navigate = useNavigate();

  //useRef e useImperativeHandle lavorano assieme
  //ricordiamo che ServerSideTableHandle è un tipo che prevedere la funzione di refetch
  const tableRef = useRef<ServerSideTableHandle>(null);

  //questo indica quali metodi o properties vengono esposte al componente padre. In questo caso tramite la prop ref si passa la funzione refetch
  useImperativeHandle(ref, () => ({
    refetch: tableRef.current?.refetch ?? (() => null),
  }));

  return (
    <ServerSideTable<PageMedicalDayDTO, MedicalDayDTO>
      ref={tableRef}
      header="Elenco medical-days"
      columns={columns}
      //al click della riga (ossia di un medical day preciso) navighiamo sulla sua pagina, ma ci passiamo intanto dei dati sotto forma di oggetto state
      //ci passiamo il title, con una data castata in dayjs, e un subtitle
      //in questo modo, anche se il componente non è un componente figlio, non compare qui dentro e quindi non possiamo utilizzare il props drilling, possiamo passare comunque delle props inserendo i dati nell'path
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
