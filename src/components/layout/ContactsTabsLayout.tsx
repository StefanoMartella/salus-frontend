import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
//import HomeBanner from "../shared/HomeBanner";
import AppTabs, { AppTabMeta } from "../tabs/AppTabs";
import UserBanner from "../../pages/contacts/UserBanner";
import HomeBanner from "../shared/HomeBanner";

type LocationState = {
  isDoctor: boolean;
  nome: string;
  cognome: string;
  sedeDenominazione: string;
  provincia: string;
};

function ContactsTabsLayout() {
  const theme = useTheme();
  const { id } = useParams();
  const { isDoctor, nome, cognome, sedeDenominazione, provincia } =
    useLocation().state as LocationState;

  const tabs: AppTabMeta[] = useMemo(
    () => [
      { label: "Informazioni", to: `/contacts/${id}`, state: { isDoctor } },
      { label: "Visite", to: `/contacts/${id}/visits`, state: { isDoctor } },
      { label: "Utenza", to: `/contacts/${id}/user`, state: { isDoctor } },
    ],
    [id, isDoctor],
  );

  return (
    <>
      {id ? (
        <UserBanner
          nome={nome}
          cognome={cognome}
          sedeDenominazione={sedeDenominazione}
          provincia={provincia}
        />
      ) : (
        <HomeBanner />
      )}

      <AppTabs style={{ marginBottom: theme.spacing(2) }} tabs={tabs} />
      <Outlet />
    </>
  );
}

export default ContactsTabsLayout;
