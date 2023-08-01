import { useQuery } from "@tanstack/react-query";

import {
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import {
  VisitaMedicaCertificatoDTO,
  VisitaMedicaControllerApi,
  VisitaMedicaDTO,
} from "../../api";
import ClientSideTable from "../../components/table/ClientSideTable";
import { CardInfo } from "./ContactDetailsPage";

function ContactVisitsPage() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["contacts-visists-details"],
    queryFn: () =>
      new VisitaMedicaControllerApi().findAll({}, { page: 0, size: 6 }),
  });

  //dato che nel backend non abbiamo una findAll filtrata per il criteria del dipendenteId, ci prendiamo tutte le visite mediche (sopra) e qui sotto le filtriamo per solo quelle che corrispondo all'id del dipendente selezionato
  const listaVisita = data?.data.content?.filter((v) => {
    console.log("id nostro" + id + "id parametro" + v.dipendente?.id);
    return v.dipendente?.id == id;
  });

  const columns: GridColDef<VisitaMedicaDTO & VisitaMedicaCertificatoDTO>[] = [
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
      renderCell: (
        params: GridRenderCellParams<
          VisitaMedicaCertificatoDTO,
          GridTreeNodeWithRender
        >,
      ) => (
        <span>
          {params.row.idCertificato !== undefined ? (
            <i className="material-icons">check_circle</i> // Sostituisci "material-icons" con la classe delle tue icone o il componente dell'icona desiderata
          ) : (
            <i className="material-icons">{params.row.idCertificato}</i> // Sostituisci "material-icons" con la classe delle tue icone o il componente dell'icona desiderata
          )}
        </span>
      ),
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
