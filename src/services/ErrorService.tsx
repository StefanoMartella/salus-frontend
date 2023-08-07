import { useEffect, useState } from "react";
import AppModal from "../components/shared/AppModal";
import Typography from "@mui/material/Typography";

function ErrorService() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const errorCallback = ((error: CustomEvent) =>
      setErrorMessage(error.detail)) as EventListener;

    window.addEventListener("axios-error", errorCallback);

    return () => {
      window.removeEventListener("axios-error", errorCallback);
    };
  }, []);

  return (
    <AppModal
      title="Si è verificato un errore"
      open={!!errorMessage}
      onClose={() => setErrorMessage("")}
    >
      <Typography>{errorMessage}</Typography>
    </AppModal>
  );
}

export default ErrorService;
