import { useQueries } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  DipendenteControllerApi,
  DipendenteDTO,
  EventoControllerApi,
  PageEventoDTO,
} from "../../api";
import { useParams } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { getFormattedDate } from "../../utils/date-utils";
import { getLabelForEventType } from "../../utils/event-utils";
import CardInfo from "../../components/shared/CardInfo";
import CustomListItem from "../../components/shared/CustomListItem";

function EmployeeDetailsPage() {
  const { id } = useParams();
  const [
    { data: employee, isLoading: isEmployeeLoading },
    { data: events, isLoading: areEventsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["employee-details", id],
        queryFn: () =>
          new DipendenteControllerApi().findById2(id as unknown as number),
        select: (response: AxiosResponse<DipendenteDTO>) => response.data,
      },
      {
        queryKey: ["employee-events", id],
        queryFn: () =>
          new EventoControllerApi().findAll4(
            { idDipendente: id as unknown as number },
            { page: 0, size: 6 },
          ),
        select: (response: AxiosResponse<PageEventoDTO>) => response.data,
      },
    ],
  });

  return isEmployeeLoading ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <CardInfo title="Informazioni generali">
          <List>
            <CustomListItem
              title="Codice fiscale"
              subTitle={employee?.codiceFiscale ?? ""}
              withDivider
            />
            <CustomListItem
              title="Data di nascita"
              subTitle={employee?.dataNascita ?? ""}
              withDivider
            />
            <CustomListItem
              title="Scadenza visita"
              subTitle={employee?.scadenzaVisita ?? ""}
              withDivider
            />
            <CustomListItem
              title="Sede"
              subTitle={employee?.sede?.denominazione ?? ""}
              withDivider
            />
            <CustomListItem
              title="Provincia"
              subTitle={employee?.sede?.provincia ?? ""}
            />
          </List>
        </CardInfo>
      </Grid>
      <Grid item xs={4}>
        <CardInfo title="Infomazioni contrattuali">
          <CustomListItem
            title="Data assunzione"
            subTitle={employee?.dataAssunzioneDipendente ?? ""}
            withDivider
          />
          <CustomListItem
            title="Data primo contratto"
            subTitle={employee?.dataPrimoContratto ?? ""}
          />
        </CardInfo>
      </Grid>
      <Grid item xs={4}>
        {areEventsLoading ? (
          <CircularProgress />
        ) : (
          <CardInfo title="Ultime attività">
            {/* {events?.content?.map((e) => (
              <CustomListItem
                key={e.id}
                title={e.tipologiaEvento ?? ""}
                subTitle={
                  e.timestamp ? getFormattedDate(new Date(e.timestamp)) : ""
                }
              />
            ))} */}
            {events?.content?.length ? (
              <Timeline position="alternate">
                {events?.content?.map((e) => (
                  <TimelineItem key={e.id}>
                    <TimelineSeparator>
                      <TimelineDot color="warning">
                        <EventIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body1">
                        {getLabelForEventType(e.tipologiaEvento)}
                      </Typography>
                      <Typography variant="body2">
                        {e.timestamp
                          ? getFormattedDate(new Date(e.timestamp))
                          : ""}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            ) : (
              <Typography>Nessun evento recente</Typography>
            )}
          </CardInfo>
        )}
      </Grid>
    </Grid>
  );
}

export default EmployeeDetailsPage;
