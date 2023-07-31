import { useQuery } from "@tanstack/react-query";

import { VisitaMedicaControllerApi, VisitaMedicaDTO } from "../../api";
import { useParams } from "react-router-dom";
import ClientSideTable from "../../components/table/ClientSideTable";
import { CardInfo } from "./ContactDetailsPage";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

function ContactVisitsPage() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["contacts-visists-details"],
    queryFn: () => new VisitaMedicaControllerApi().findAll({}, { size: 6 }),
  });

  const listaVisita = data?.data.content?.filter((v) => {
    console.log("id nostro" + id + "id parametro" + v.dipendente?.id);
    return v.dipendente?.id == id;
  });
  const columns: GridColDef<VisitaMedicaDTO>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "data-visita",
      headerName: "Data Visita",
      flex: 1,
      valueGetter: (param: GridValueGetterParams<VisitaMedicaDTO>) =>
        param.row.medicalDay?.data,
    },
    {
      field: "certificato",
      headerName: "Certificato Idoneità",
      flex: 1,
      valueGetter: (param: GridValueGetterParams<VisitaMedicaDTO>) =>
        param.row.certificato,
    },
  ];
  console.log(listaVisita);
  return (
    <CardInfo title="Visite Mediche">
      <ClientSideTable
        columns={columns}
        header={""}
        rows={listaVisita ?? []}
      ></ClientSideTable>
    </CardInfo>
  );
}

export default ContactVisitsPage;
