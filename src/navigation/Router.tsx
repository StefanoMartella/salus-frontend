import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import MedicalDaysLayout from "../components/layout/MedicalDaysLayout";
import MedicalDaysTabsLayout from "../components/layout/MedicalDaysTabsLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MedicalDaysDetailsPage from "../pages/medical-days/MedicalDaysDetailsPage";
import MedicalDaysPage from "../pages/medical-days/MedicalDaysPage";
import ContactPage from "../pages/contacts/ContactPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index element={<Navigate to="/dashboard" />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route
        path="calendar"
        element={
          <div>
            <span>Calendar</span>
          </div>
        }
      />
      <Route path="visits" element={<MedicalDaysLayout />}>
        <Route index element={<MedicalDaysPage />} />
        <Route path=":id" element={<MedicalDaysTabsLayout />}>
          <Route index element={<MedicalDaysDetailsPage />} />
          <Route path="signatures" element={<span>Foglio firme</span>} />
        </Route>
      </Route>
      <Route path="contacts" element={<ContactPage />} />
      <Route
        path="imports"
        element={
          <div>
            <span>Imports</span>
          </div>
        }
      />
    </Route>,
  ),
);

export default router;
