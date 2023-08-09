import Tab from "@mui/material/Tab";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useRouteMatch } from "../../hooks/useRouteMatch";

//definiamo un tipo che contiene props "to" e "label" di tipo string, e poi anche state {isDoctor, onlyActives} opzionale, aggiunto al path
export type AppTabMeta = {
  to: string;
  label: string;
  state?: object;
};

//definiamo un tipo che estende le props di TabsProps (di Material) e gli aggiungiamo noi la proprietà tabs
type Props = TabsProps & {
  tabs: AppTabMeta[];
};

function AppTabs({ tabs, ...rest }: Props) {
  const theme = useTheme();
  const routeMatch = useRouteMatch(tabs.map((t) => t.to)); //confronta i paths passati in input e se corrisponde a quello corrente, ne restituisce l'oggetto
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
