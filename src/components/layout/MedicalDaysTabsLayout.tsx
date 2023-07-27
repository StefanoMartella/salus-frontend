import { Outlet, useParams } from "react-router-dom";
import AppTabs, { AppTabMeta } from "../tabs/AppTabs";
import { useMemo } from "react";

function MedicalDaysTabsLayout() {
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
      <AppTabs tabs={tabs} />
      <Outlet />
    </div>
  );
}

export default MedicalDaysTabsLayout;
