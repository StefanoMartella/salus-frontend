import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ContactFilters from "../../components/filters/ContactFilters";
import ContactsTable, {
  ContactTableFilters,
} from "../../components/table/ContactsTable";

function ContactPage() {
  const queryTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [contactFilters, setContactFilters] = useState<ContactTableFilters>({
    doctors: false,
    onlyActives: false,
    query: "",
  });

  const updateQuery: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = useCallback(({ target: { value: query } }) => {
    clearTimeout(queryTimeout.current);

    queryTimeout.current = setTimeout(() => {
      setContactFilters((oldFilters) => ({
        ...oldFilters,
        query,
      }));
    }, 300);
  }, []);

  useEffect(() => {
    return () => clearTimeout(queryTimeout.current);
  }, []);

  return (
    <Grid container>
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
        <ContactsTable
          renderAboveTable={() => (
            <Grid container>
              <TextField
                fullWidth
                sx={{ marginBottom: ({ spacing }) => spacing(2) }}
                placeholder="Filtra per nome"
                onChange={updateQuery}
              />
            </Grid>
          )}
          filters={contactFilters}
        />
      </Grid>
    </Grid>
  );
}

export default ContactPage;
