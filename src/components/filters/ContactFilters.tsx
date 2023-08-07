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

type Filters = Omit<ContactTableFilters, "query">;

type Props = {
  onChange: (filters: Filters) => void;
};

function ContactFilters({ onChange }: Props) {
  const [filters, setFilters] = useState<Filters>({
    doctors: false,
    onlyActives: false,
  });

  const onSwitchChange = useCallback((key: keyof Filters) => {
    setFilters((oldFilters) => ({ ...oldFilters, [key]: !oldFilters[key] }));
  }, []);

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
