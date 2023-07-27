import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { QueryFunction, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { CircularProgress } from "@mui/material";
import { DipendenteControllerApi } from "../../api";
import { getFormattedDate } from "../../utils/date-utils";

type BoxProps = {
  subText: string;
  color: string;
  queryKey: string;
  queryFn: QueryFunction<AxiosResponse<number>>;
};

function Box({ queryKey, queryFn, subText, color }: BoxProps) {
  const theme = useTheme();
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn,
    select: (response) => response.data,
  });

  return (
    <Card>
      <CardContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h3" align="center" color={color}>
              {data}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color={theme.palette.grey[500]}
            >
              {subText}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function HomeBoxes() {
  const theme = useTheme();

  return (
    <Grid container spacing={2} marginBottom={2}>
      <Grid item xs={3}>
        <Box
          queryKey="expired-certificates"
          queryFn={() =>
            new DipendenteControllerApi().count({
              scadenzaVisitaDal: { lessThanOrEqual: getFormattedDate() },
            })
          }
          subText="Certificati scaduti"
          color={theme.palette.primary.main}
        />
      </Grid>
      <Grid item xs={3}>
        <Box
          queryKey="almost-expired-certificates"
          queryFn={() =>
            new DipendenteControllerApi().count({
              scadenzaVisitaDal: { lessThanOrEqual: getFormattedDate() },
            })
          }
          subText="Certificati in scadenza"
          color={theme.palette.secondary.main}
        />
      </Grid>
      <Grid item xs={3}>
        <Box
          queryFn={() =>
            new Promise((r) => r({ data: 5 } as AxiosResponse<number>))
          }
          queryKey="suspended-certificates"
          subText="Sospesi"
          color={theme.palette.info.main}
        />
      </Grid>
      <Grid item xs={3}>
        <Box
          queryFn={() =>
            new Promise((r) => r({ data: 7 } as AxiosResponse<number>))
          }
          queryKey="report-certificates"
          subText="Report"
          color={theme.palette.warning.main}
        />
      </Grid>
    </Grid>
  );
}

export default HomeBoxes;
