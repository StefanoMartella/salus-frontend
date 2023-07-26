import React from "react";
import { useRouteMatch } from "../../hooks/useRouteMatch";
import { Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";

function VisiteMedicheTab() {
  const routeMatch = useRouteMatch(["/dettagli", "/fogliofirme"]);
  const currentTab = routeMatch?.pattern?.path;
  return (
    <Tabs value={currentTab}>
      <Tab
        label="Dettagli"
        value="visits/dettagli"
        to="dettagli"
        component={Link}
      />
      <Tab
        label="Foglio Firme"
        value="visits/fogliofirme"
        to="fogliofirme"
        component={Link}
      />
    </Tabs>
  );
}

export default VisiteMedicheTab;
