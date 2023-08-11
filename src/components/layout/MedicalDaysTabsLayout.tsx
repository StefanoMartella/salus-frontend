import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import AppTabs, { AppTabMeta } from "../tabs/AppTabs";
import AppBanner from "../shared/AppBanner";

type LocationState = {
  title: string;
  subTitle?: string;
};

//Tabs che compaiono quando dalla pagina /visits clicchi su un medical day e quindi finisci sulla pagina visits/1 ad esempio
function MedicalDaysTabsLayout() {
  const theme = useTheme();
  const { id } = useParams();
  const { title, subTitle } = useLocation().state as LocationState;

  const tabs: AppTabMeta[] = useMemo(
    () => [
      { label: "Dettagli", to: `/visits/${id}`, state: { title, subTitle } },
      {
        label: "Foglio firme",
        to: `/visits/${id}/signatures`,
        state: { title, subTitle },
      },
    ],
    [id, subTitle, title],
  );

  return (
    <>
      <AppBanner title={title} subTitle={subTitle} />
      <AppTabs style={{ marginBottom: theme.spacing(2) }} tabs={tabs} />
      <Outlet />
    </>
  );
}

export default MedicalDaysTabsLayout;
