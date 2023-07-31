import EventIcon from "@mui/icons-material/Event";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useQueries } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
  DipendenteControllerApi,
  DipendenteDTO,
  EventoControllerApi,
  PageEventoDTO,
} from "../../api";
import { getFormattedDate } from "../../utils/date-utils";
import { getLabelForEventType } from "../../utils/event-utils";

type CardInfoProps = {
  title: string;
  children: ReactNode;
};

function CardInfo({ title, children }: CardInfoProps) {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{
          color: "white",
          fontSize: theme.typography.h6.fontSize,
        }}
        style={{ background: theme.palette.primary.light }}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
}

type CustomListItemProps = {
  title: string;
  subTitle: string;
  withDivider?: boolean;
};

function CustomListItem({ title, subTitle, withDivider }: CustomListItemProps) {
  return (
    <>
      <ListItem>
        <ListItemText primary={title} secondary={subTitle} />
      </ListItem>
      {withDivider ? <Divider /> : <></>}
    </>
  );
}

function ContactDetailsPage() {
  const { id } = useParams();
  const [
    { data: contact, isLoading: isContactLoading },
    { data: events, isLoading: areEventsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["contact-details", id],
        queryFn: () =>
          new DipendenteControllerApi().findById2(id as unknown as number),
        select: (response: AxiosResponse<DipendenteDTO>) => response.data,
      },
      {
        queryKey: ["contact-events", id],
        queryFn: () =>
          new EventoControllerApi().findAll4(
            { idDipendente: id as unknown as number },
            { page: 0, size: 6 },
          ),
        select: (response: AxiosResponse<PageEventoDTO>) => response.data,
      },
    ],
  });

  return isContactLoading ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <CardInfo title="Informazioni generali">
          <List>
            <CustomListItem
              title="Codice fiscale"
              subTitle={contact?.codiceFiscale ?? ""}
              withDivider
            />
            <CustomListItem
              title="Data di nascita"
              subTitle={contact?.dataNascita ?? ""}
              withDivider
            />
            <CustomListItem
              title="Scadenza visita"
              subTitle={contact?.scadenzaVisita ?? ""}
              withDivider
            />
            <CustomListItem
              title="Sede"
              subTitle={contact?.sede?.denominazione ?? ""}
              withDivider
            />
            <CustomListItem
              title="Provincia"
              subTitle={contact?.sede?.provincia ?? ""}
            />
          </List>
        </CardInfo>
      </Grid>
      <Grid item xs={4}>
        <CardInfo title="Infomazioni contrattuali">
          <CustomListItem
            title="Data assunzione"
            subTitle={contact?.dataAssunzioneDipendente ?? ""}
            withDivider
          />
          <CustomListItem
            title="Data primo contratto"
            subTitle={contact?.dataPrimoContratto ?? ""}
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

export default ContactDetailsPage;
