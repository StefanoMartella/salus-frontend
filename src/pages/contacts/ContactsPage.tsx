import Grid from "@mui/material/Grid";
import HomeBanner from "../../components/shared/HomeBanner";
import ContactsTable from "../../components/table/ContactsTable";
import { DipendenteControllerApi, DipendenteDTO } from "../../api";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 5;
function ContactsPage() {
  const [paginationModel] = useState<GridPaginationModel>({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const { data: dipendenti, isLoading } = useQuery({
    queryKey: ["dipendenti-details"],
    queryFn: () =>
      new DipendenteControllerApi().findAll5(
        {},
        { page: paginationModel.page, size: paginationModel.pageSize },
      ),
    select: (response) => response.data,
  });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container>
      <Grid item xs={10} padding={1}>
        <HomeBanner />
        <ContactsTable
          patients={dipendenti?.content?.map((v) => v as DipendenteDTO) ?? []}
          pageNumber={dipendenti?.pageable?.pageNumber}
          pageSize={dipendenti?.pageable?.pageSize}
        />
      </Grid>
    </Grid>
  );
}

export default ContactsPage;
