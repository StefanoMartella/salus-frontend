import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

import FilterFramesIcon from "@mui/icons-material/FilterFrames";

function Riepilogo() {
  const theme = useTheme();
  {
    /*const { data, isLoading } = useQuery({
    queryKey: ["medical-day"],
    queryFn: () => new MedicaDayControllerApi().findById1(),
  });*/
  }
  return (
    <Card style={{ backgroundColor: "white" }}>
      <CardHeader>
        <Box
          style={{
            backgroundColor: theme.palette.primary.light,
            padding: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(1),
            alignItems: "center",
          }}
        >
          <FilterFramesIcon style={{ color: "white" }} />
          <Typography variant="body2" color="white" fontSize={16}>
            Riepilogo
          </Typography>
        </Box>
      </CardHeader>
      <CardContent style={{ padding: 0 }}>
        <Typography align="center" variant="body1"></Typography>
        <Typography align="center" variant="h3" marginY={1}></Typography>
        <Typography align="center" variant="body1"></Typography>
      </CardContent>
    </Card>
  );
}

export default Riepilogo;
