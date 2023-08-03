//questo è un HOC, un Higher Order Component, ossia un design pattern che prevede una funzione che prende un componente come input e restituisce un nuovo componente con nuove funzionalità o proprietà aggiuntive.
//in questo caso specifico, withSnackbar prende il componente MedicalDaysPage e gli aggiunge la funzionalità di poter settare le snackbarAttributes, ossia aggiungere il message e la severity (ossia succes o error e colori...) al messaggio di alert della snackbar

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ElementType, useState } from "react";

type SnackbarAttributes = {
  message?: string;
  severity?: "info" | "success" | "warning" | "error";
};

//la props equivale ad una funzione che prevede un oggetto con props interni message e severity e restituisce void.
export type SnackbarProps = {
  setSnackbarAttributes: (snackbarAttributes: SnackbarAttributes) => void;
};

//nel MedicalDaysPage abbiamo exportato withSnackbar(MedicalDaysPage) quindi MedicalDaysPage è il WrappedComponent
function withSnackbar<P>(WrappedComponent: ElementType) {
  return function Wrapper(passThroughProps: P) {
    const [snackbarAttributes, setSnackbarAttributes] =
      useState<SnackbarAttributes>({});

    return (
      <>
        {/* qui il WrappedComponent è MedicalDaysPage */}
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

export default withSnackbar;
