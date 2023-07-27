import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import MedicalDaysLayout from "../components/layout/MedicalDaysLayout";
import MedicalDaysTabsLayout from "../components/layout/MedicalDaysTabsLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MedicalDaysDetailsPage from "../pages/medical-days/MedicalDaysDetailsPage";
import MedicalDaysPage from "../pages/medical-days/MedicalDaysPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
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
      <Route
        path="contacts"
        element={
          <div>
            <span>Contacts</span>
          </div>
        }
      />
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
