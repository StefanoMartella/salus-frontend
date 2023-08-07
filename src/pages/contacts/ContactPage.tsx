import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useRef, useState } from "react";
import ContactFilters from "../../components/filters/ContactFilters";
import HomeBanner from "../../components/shared/HomeBanner";
import DoctorsTable from "../../components/table/DoctorsTable";
import EmployeesTable from "../../components/table/EmployeesTable";

export type ContactTableFilters = {
  doctors: boolean;
  onlyActives: boolean;
  query?: string;
};

function ContactPage() {
  const queryTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [query, setQuery] = useState<string>("");
  const [contactFilters, setContactFilters] = useState<ContactTableFilters>({
    doctors: false,
    onlyActives: false,
    query,
  });

  const renderAboveTable = useCallback(() => {
    return (
      <Grid container>
        <TextField
          fullWidth
          sx={{ marginBottom: ({ spacing }) => spacing(2) }}
          placeholder="Filtra per nome"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </Grid>
    );
  }, [query]);

  useEffect(() => {
    clearTimeout(queryTimeout.current);

    queryTimeout.current = setTimeout(() => {
      setContactFilters((oldFilters) => ({
        ...oldFilters,
        query,
      }));
    }, 300);
  }, [query]);

  useEffect(() => {
    return () => clearTimeout(queryTimeout.current);
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <HomeBanner />
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <ContactFilters
              onChange={(filters) =>
                setContactFilters((oldFilters) => ({
                  ...oldFilters,
                  ...filters,
                }))
              }
            />
          </Grid>
          <Grid item xs={10}>
            {contactFilters.doctors ? (
              <DoctorsTable
                renderAboveTable={renderAboveTable}
                filters={contactFilters}
              />
            ) : (
              <EmployeesTable
                renderAboveTable={renderAboveTable}
                filters={contactFilters}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ContactPage;
