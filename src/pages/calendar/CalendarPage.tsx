import Badge from "@mui/material/Badge";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MedicaDayControllerApi } from "../../api";
import AppModal from "../../components/shared/AppModal";
import { LONG_DATE_FORMAT, SERVER_DATE_FORMAT } from "../../utils/date-utils";
import { MedicalDayDTO } from "./../../api/models/medical-day-dto";

/*

{
  '05-08-2023': [{<medical_day1>}, <medical_day2>],
  '06-08-2023': [{<medical_day3>}],
}

*/

type ServerDayProps = PickersDayProps<Dayjs> & {
  highlightedDays?: { [key: string]: MedicalDayDTO[] };
  onMatchClick?: (medicalDays: MedicalDayDTO[]) => void;
};

function ServerDay({
  highlightedDays = {},
  day,
  outsideCurrentMonth,
  onMatchClick,
  ...rest
}: ServerDayProps) {
  const match = highlightedDays[day.format(SERVER_DATE_FORMAT)];

  return (
    <Badge
      overlap="circular"
      key={day.toString()}
      badgeContent={match && !outsideCurrentMonth ? "✅" : undefined}
    >
      <PickersDay
        outsideCurrentMonth={outsideCurrentMonth}
        onClick={match ? () => onMatchClick?.(match) : undefined}
        day={day}
        {...rest}
      />
    </Badge>
  );
}

type DateWindow = {
  start: string;
  end: string;
};

function CalendarPage() {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedDateWindow, setSelectedDateWindow] = useState<DateWindow>({
    start: dayjs().startOf("month").format(SERVER_DATE_FORMAT),
    end: dayjs().endOf("month").format(SERVER_DATE_FORMAT),
  });
  const [medicalDaysToShow, setMedicalDaysToShow] = useState<MedicalDayDTO[]>(
    [],
  );
  const { data: medicalDays } = useQuery({
    queryKey: ["calendar-medical-days", selectedDateWindow],
    queryFn: () =>
      new MedicaDayControllerApi().findAll3(
        {
          dataGiorno: {
            greaterThanOrEqual: selectedDateWindow.start,
            lessThanOrEqual: selectedDateWindow.end,
          },
        },
        { page: 0, size: 100 },
      ),
    select: (response) => response.data,
  });

  const onDateChange = useCallback((date: Dayjs) => {
    setSelectedDateWindow({
      start: date.startOf("month").format(SERVER_DATE_FORMAT),
      end: date.endOf("month").format(SERVER_DATE_FORMAT),
    });
  }, []);

  return (
    <Grid container>
      <Card style={{ width: "100%" }} elevation={5}>
        <CardContent>
          <DateCalendar
            onMonthChange={onDateChange}
            onYearChange={onDateChange}
            sx={{
              width: "100%",
              maxHeight: "inherit",
              "& .MuiDateCalendar-viewTransitionContainer": ({ spacing }) => ({
                "& button": {
                  fontSize: 16,
                },
                "& > div > div": {
                  justifyContent: "space-between !important",
                  padding: `0 ${spacing(1.25)}`,
                },
                "& div[role=row]": {
                  padding: `${spacing(3)} ${spacing(1.25)}`,
                  justifyContent: "space-between !important",
                },
                "& div[role=presentation]": {
                  minHeight: 550,
                },
              }),
            }}
            slots={{
              day: (props: PickersDayProps<Dayjs>) => <ServerDay {...props} />,
            }}
            slotProps={
              {
                day: {
                  onMatchClick: (medicalDays: MedicalDayDTO[]) => {
                    setMedicalDaysToShow(medicalDays);
                    setIsModalVisible(true);
                  },
                  highlightedDays: medicalDays?.content?.reduce(
                    (accumulator, current) => {
                      const date = dayjs(current.data).format(
                        SERVER_DATE_FORMAT,
                      );
                      return {
                        ...accumulator,
                        [date]: accumulator[date]
                          ? [...accumulator.date, current]
                          : [current],
                      };
                    },
                    {} as { [key: string]: MedicalDayDTO[] },
                  ),
                },
              } as never
            }
          />
        </CardContent>
      </Card>
      <AppModal
        title="Eventi del giorno"
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <List>
          {medicalDaysToShow.map((md) => (
            <ListItem
              key={md.id}
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/visits/${md.id}`, {
                  state: {
                    title: `Medical Day - ${dayjs(
                      md.data,
                      SERVER_DATE_FORMAT,
                    ).format(LONG_DATE_FORMAT)}`,
                    subTitle: `Medico: ${md.contratto.medico?.nome} ${md.contratto.medico?.cognome}`,
                  },
                })
              }
            >
              <ListItemText
                primary={`${md.contratto.medico?.nome} ${md.contratto.medico?.nome}`}
                secondary={md.contratto.sede?.denominazione}
              />
            </ListItem>
          ))}
        </List>
      </AppModal>
    </Grid>
  );
}

export default CalendarPage;
