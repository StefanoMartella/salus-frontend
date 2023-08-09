import { useParams } from "react-router-dom";
import VisitsTable from "../../components/table/VisitsTable";

function ContactVisitsPage() {
  const { id } = useParams();

  return <VisitsTable patientId={id as string} />;
}

export default ContactVisitsPage;
