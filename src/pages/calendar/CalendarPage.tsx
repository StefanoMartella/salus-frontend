import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Badge from "@mui/material/Badge";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { MedicalDayDTO } from "./../../api/models/medical-day-dto";

/*

{
  '05-08-2023': [{<medical_day1>}, <medical_day2>],
  '06-08-2023': [{<medical_day3>}],
}

*/

type ServerDayProps = PickersDayProps<Dayjs> & {
  highlightedDays?: { [key: string]: MedicalDayDTO[] };
};

function ServerDay({
  highlightedDays = {},
  day,
  outsideCurrentMonth,
  ...rest
}: ServerDayProps) {
  const match = highlightedDays[day.format("YYYY-MM-DD")];

  return (
    <Badge
      overlap="circular"
      key={day.toString()}
      badgeContent={match && !outsideCurrentMonth ? "✅" : undefined}
    >
      <PickersDay
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        {...rest}
      />
    </Badge>
  );
}

function CalendarPage() {
  return (
    <Grid container>
      <Card style={{ width: "100%" }} elevation={5}>
        <CardContent>
          <DateCalendar
            slots={{
              day: (props: PickersDayProps<Dayjs>) => <ServerDay {...props} />,
            }}
            slotProps={
              {
                day: {
                  highlightedDays: { "2023-08-05": [{ id: 1 }] },
                },
              } as never
            }
          />
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CalendarPage;
