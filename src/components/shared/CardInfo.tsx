import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useTheme } from "@mui/material/styles";
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function CardInfo({ title, children }: Props) {
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
