import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import AppTabs, { AppTabMeta } from "../tabs/AppTabs";

function ContactsTabsLayout() {
  const theme = useTheme();
  const { id } = useParams();

  //useMemo qui è usato solo per ricordare il valore della costante tabs, che è di tipo array AppTabMeta. AppTabMeta è un oggetto che contiene props label e to
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
      {/* passiamo come props la lista di tabs, poi il componente si occuperà di ciclarli e renderizzarli */}
      <AppTabs style={{ marginBottom: theme.spacing(2) }} tabs={tabs} />
      <Outlet />
    </div>
  );
}

export default ContactsTabsLayout;
