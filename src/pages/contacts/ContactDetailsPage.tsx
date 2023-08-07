import { useLocation } from "react-router-dom";
import DoctorDetailsPage from "./DoctorDetailsPage";
import EmployeeDetailsPage from "./EmployeeDetailsPage";

type LocationState = {
  isDoctor: boolean;
};

function ContactDetailsPage() {
  const { isDoctor } = useLocation().state as LocationState;

  return isDoctor ? <DoctorDetailsPage /> : <EmployeeDetailsPage />;
}

export default ContactDetailsPage;
