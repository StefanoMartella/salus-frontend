import { Outlet, useParams } from "react-router-dom";
import AppTabs, { AppTabMeta } from "../tabs/AppTabs";
import { useMemo } from "react";
import { useTheme } from "@mui/material/styles";

function ContactsTabsLayout() {
  const theme = useTheme();
  const { id } = useParams();

  const tabs: AppTabMeta[] = useMemo(
    () => [
      { label: "Informazioni", to: `/contacts/${id}` },
      { label: "Visite", to: `/contacts/${id}/visits` },
      { label: "Utenza", to: `/contacts/${id}/user` },
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

export default ContactsTabsLayout;
