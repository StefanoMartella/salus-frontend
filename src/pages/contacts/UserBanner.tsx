import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Grid } from "@mui/material";
type Props = {
  nome: string;
  cognome: string;
  sedeDenominazione?: string;
  provincia?: string;
};

function UserBanner({ nome, cognome, sedeDenominazione, provincia }: Props) {
  const theme = useTheme();

  return (
    <Paper
      style={{
        position: "relative",
        backgroundImage: `url("https://www.fulltravel.it/wp-content/uploads/2019/11/Cosa-vedere-a-Milano.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: 120,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
      }}
    >
      <Box
        position="absolute"
        bottom={0}
        left={theme.spacing(2)}
        paddingX={theme.spacing(2)}
        paddingY={theme.spacing(1)}
        flexDirection={"row"}
        display={"flex"}
      >
        <AccountCircleIcon
          fontSize="large"
          color="secondary"
          style={{ padding: "8px" }}
        />
        <Grid container flexDirection={"row"}>
          <Grid xs={12} fontWeight={"bold"} color={"white"}>
            {nome + " " + cognome}
          </Grid>
          <Grid
            xs={12}
            fontStyle={"italic"}
            textTransform={"uppercase"}
            color={"white"}
          >
            {sedeDenominazione + " - " + provincia}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default UserBanner;
