import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ContactsTabsLayout from "../components/layout/ContactsTabsLayout";
import MedicalDaysTabsLayout from "../components/layout/MedicalDaysTabsLayout";
import CalendarPage from "../pages/calendar/CalendarPage";
import ContactDetailsPage from "../pages/contacts/ContactDetailsPage";
import ContactPage from "../pages/contacts/ContactPage";
import ContactVisitsPage from "../pages/contacts/ContactVisitsPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MedicalDaysDetailsPage from "../pages/medical-days/MedicalDaysDetailsPage";
import MedicalDaysPage from "../pages/medical-days/MedicalDaysPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index element={<Navigate to="/dashboard" />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="calendar" element={<CalendarPage />} />
      <Route path="visits">
        <Route index element={<MedicalDaysPage />} />
        <Route path=":id" element={<MedicalDaysTabsLayout />}>
          <Route index element={<MedicalDaysDetailsPage />} />
          <Route path="signatures" element={<div>Foglio firme</div>} />
        </Route>
      </Route>
      <Route path="contacts">
        <Route index element={<ContactPage />} />
        <Route path=":id" element={<ContactsTabsLayout />}>
          <Route index element={<ContactDetailsPage />} />
          <Route path="visits" element={<ContactVisitsPage />} />
          <Route path="user" element={<div>Utenza</div>} />
        </Route>
      </Route>
      <Route
        path="imports"
        element={
          <div>
            <span>Imports content</span>
          </div>
        }
      />
    </Route>,
  ),
);

export default router;
