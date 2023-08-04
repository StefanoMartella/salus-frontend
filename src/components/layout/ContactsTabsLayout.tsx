import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import HomeBanner from "../shared/HomeBanner";
import AppTabs, { AppTabMeta } from "../tabs/AppTabs";

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
    <>
      <HomeBanner />
      <AppTabs style={{ marginBottom: theme.spacing(2) }} tabs={tabs} />
      <Outlet />
    </>
  );
}

export default ContactsTabsLayout;
