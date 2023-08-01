import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ContactsLayout from "../components/layout/ContactsLayout";
import ContactsTabsLayout from "../components/layout/ContactsTabsLayout";
import MedicalDaysLayout from "../components/layout/MedicalDaysLayout";
import MedicalDaysTabsLayout from "../components/layout/MedicalDaysTabsLayout";
import ContactDetailsPage from "../pages/contacts/ContactDetailsPage";
import ContactPage from "../pages/contacts/ContactPage";
import ContactVisitsPage from "../pages/contacts/ContactsVisitsPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MedicalDaysDetailsPage from "../pages/medical-days/MedicalDaysDetailsPage";
import MedicalDaysPage from "../pages/medical-days/MedicalDaysPage";

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
      <Route path="contacts" element={<ContactsLayout />}>
        <Route index element={<ContactPage />} />
        <Route path=":id" element={<ContactsTabsLayout />}>
          <Route index element={<ContactDetailsPage />} />
          <Route path="visits" element={<ContactVisitsPage />} />
          <Route path="user" element={<span>Utenza</span>} />
        </Route>
      </Route>
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
