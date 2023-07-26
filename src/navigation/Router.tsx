import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import VisitaMedicaPage from "../pages/visitamedica/VisitaMedicaPage";

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
      <Route path="visits/:id" element={<VisitaMedicaPage />}>
        <Route
          path="dettagli"
          element={
            <div>
              <span>Dettagli</span>
            </div>
          }
        />
        <Route
          path="fogliofirme"
          element={
            <div>
              <span>Foglio Firme</span>
            </div>
          }
        />
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
