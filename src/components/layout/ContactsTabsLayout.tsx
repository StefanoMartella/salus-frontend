import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import AppTabs, { AppTabMeta } from "../tabs/AppTabs";
import AppBanner from "../shared/AppBanner";

type LocationState = {
  isDoctor: boolean;
  title: string;
  subTitle?: string;
};

function ContactsTabsLayout() {
  const theme = useTheme();
  const { id } = useParams();
  const { isDoctor, title, subTitle } = useLocation().state as LocationState;

  const tabs: AppTabMeta[] = useMemo(
    () => [
      {
        label: "Informazioni",
        to: `/contacts/${id}`,
        state: { isDoctor, title, subTitle },
      },
      {
        label: "Visite",
        to: `/contacts/${id}/visits`,
        state: { isDoctor, title, subTitle },
      },
    ],
    [id, isDoctor, subTitle, title],
  );

  return (
    <>
      <AppBanner title={title} subTitle={subTitle} />
      <AppTabs style={{ marginBottom: theme.spacing(2) }} tabs={tabs} />
      <Outlet />
    </>
  );
}

export default ContactsTabsLayout;
