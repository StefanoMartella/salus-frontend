import Tab from "@mui/material/Tab";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useRouteMatch } from "../../hooks/useRouteMatch";

export type AppTabMeta = {
  to: string;
  label: string;
  state?: object;
};

type Props = TabsProps & {
  tabs: AppTabMeta[];
};

function AppTabs({ tabs, ...rest }: Props) {
  const theme = useTheme();
  const routeMatch = useRouteMatch(tabs.map((t) => t.to));
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab} {...rest}>
      {tabs.map(({ label, to, state }) => (
        <Tab
          key={to}
          style={{ padding: theme.spacing(3) }}
          label={label}
          value={to}
          to={to.replaceAll("*", "")}
          state={state}
          component={Link}
        />
      ))}
    </Tabs>
  );
}

export default AppTabs;
