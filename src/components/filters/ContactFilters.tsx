//filtri per la tabella dei contatti

import PersonIcon from "@mui/icons-material/Person";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import { useCallback, useState } from "react";
import { useUpdateEffect } from "../../hooks/useUpdateEffect";
import { ContactTableFilters } from "../../pages/contacts/ContactPage";

//Il type Omit serve a creare un nuovo type escludendo una props da un type già esistente
//vuole il tipo già esistente e appunto la props da togliere
type Filters = Omit<ContactTableFilters, "query">;

type Props = {
  onChange: (filters: Filters) => void;
};

function ContactFilters({ onChange }: Props) {
  //definiamo i filtri
  const [filters, setFilters] = useState<Filters>({
    doctors: false,
    onlyActives: false,
  });

  //[key] è una "computed key" ossia la chiave di un oggetto che è calcolata dinamicamente invece che inserita staticamente e manualmente da noi
  //Cosa succede qui sotto? Questa funzione onSwitchChange viene chiamata quando il toggle button (o Switch) di un filtro viene cliccato
  //key è del tipo Filters, quindi assume una delle due props di quel tipo: doctor o onlyActives
  //[key] se viene cliccato il toggle button del dottore, sarà la chiave doctor, altrimento onlyActives, e otterrà un valore pari all'opposto del suo valore precedente: da false a true e viceversa
  const onSwitchChange = useCallback((key: keyof Filters) => {
    setFilters((oldFilters) => ({ ...oldFilters, [key]: !oldFilters[key] }));
  }, []);

  //è un hook simile allo useEffect ma che permette di impedire l'esecuzione di un effetto al primo render quindi al mount del component
  useUpdateEffect(() => {
    onChange(filters);
  }, [filters]);

  return (
    <List subheader={<ListSubheader>Filtri</ListSubheader>}>
      <ListItem>
        <ListItemIcon>
          <PersonIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Medici" />
        <Switch
          edge="end"
          onChange={() => onSwitchChange("doctors")}
          value={filters.doctors}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <PersonIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Solo attivi" />
        <Switch
          edge="end"
          onChange={() => onSwitchChange("onlyActives")}
          value={filters.onlyActives}
        />
      </ListItem>
    </List>
  );
}

export default ContactFilters;
