import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ElementType, useState } from "react";

type SnackbarAttributes = {
  message?: string;
  severity?: "info" | "success" | "warning" | "error";
};

export type SnackbarProps = {
  setSnackbarAttributes: (snackbarAttributes: SnackbarAttributes) => void;
};

export default function withSnackbar<P>(WrappedComponent: ElementType) {
  return function Wrapper(passThroughProps: P) {
    const [snackbarAttributes, setSnackbarAttributes] =
      useState<SnackbarAttributes>({});

    return (
      <>
        <WrappedComponent
          setSnackbarAttributes={(snackbarAttributes: SnackbarAttributes) =>
            setSnackbarAttributes(snackbarAttributes)
          }
          {...passThroughProps}
        />
        <Snackbar
          open={!!snackbarAttributes.message}
          autoHideDuration={3000}
          onClose={() => setSnackbarAttributes({})}
        >
          <Alert severity={snackbarAttributes.severity ?? "info"}>
            {snackbarAttributes.message}
          </Alert>
        </Snackbar>
      </>
    );
  };
}
