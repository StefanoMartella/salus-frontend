import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import {
  getCurrentDayName,
  getCurrentDayNumber,
  getCurrentMonthName,
  getCurrentTime,
  getCurrentYearNumber,
} from "../../utils/date-utils";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { capitalize } from "./../../utils/string-utils";

function TodaySection() {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(getCurrentTime()), 1000); //aggiorna ogni secondo l'orario attuale

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card style={{ backgroundColor: "white", marginBottom: theme.spacing(2) }}>
      <CardHeader
        title={`${capitalize(getCurrentDayName())}, ${currentTime}`}
        titleTypographyProps={{
          fontSize: 16,
          color: theme.palette.grey[100],
        }}
        style={{ backgroundColor: theme.palette.primary.light }}
      />
      <CardContent>
        <Typography align="center" variant="body1">
          {capitalize(getCurrentMonthName())}
        </Typography>
        <Typography align="center" variant="h3" marginY={1}>
          {getCurrentDayNumber()}
        </Typography>
        <Typography align="center" variant="body1">
          {getCurrentYearNumber()}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TodaySection;
