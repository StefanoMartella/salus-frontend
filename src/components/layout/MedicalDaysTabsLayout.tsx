import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import AppTabs, { AppTabMeta } from "../tabs/AppTabs";

//Tabs che compaiono quando dalla pagina /visits clicchi su un medical day e quindi finisci sulla pagina visits/1 ad esempio
function MedicalDaysTabsLayout() {
  const theme = useTheme();
  const { id } = useParams();

  const tabs: AppTabMeta[] = useMemo(
    () => [
      { label: "Dettagli", to: `/visits/${id}` },
      { label: "Foglio firme", to: `/visits/${id}/signatures` },
    ],
    [id],
  );

  return (
    <div>
      <AppTabs style={{ marginBottom: theme.spacing(2) }} tabs={tabs} />
      <Outlet />
    </div>
  );
}

export default MedicalDaysTabsLayout;
