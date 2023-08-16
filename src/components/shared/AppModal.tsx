import Modal, { ModalProps } from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

type Props = ModalProps & {
  title: string;
};

function AppModal({ children, title, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Modal {...rest}>
      <Card
        sx={{
          //as const serve ad assicurarci che il valore venga trattato da TS come literal
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 1000,
          boxShadow: 24,
        }}
      >
        <CardHeader
          component={() => (
            <Grid
              style={{ backgroundColor: theme.palette.primary.light }}
              container
              padding={2}
              justifyContent="space-between"
            >
              <Typography variant="h5" style={{ color: "white" }}>
                {title}
              </Typography>
              <IconButton
                onClick={(e) => rest.onClose?.(e, "backdropClick")}
                aria-label="close"
                style={{ color: "white" }}
              >
                <CloseIcon style={{ color: "white" }} />
              </IconButton>
            </Grid>
          )}
        />
        <CardContent>{children}</CardContent>
      </Card>
    </Modal>
  );
}

export default AppModal;
