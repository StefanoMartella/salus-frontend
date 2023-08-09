import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from "@mui/material/IconButton/IconButton";
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { VisitaMedicaControllerApi } from "../../api";

type Props = {
  visitId: number;
  attachmentId: string | null;
};

function AttachmentHandler({ visitId, attachmentId }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: any) => {
    const file = event.nativeEvent.target.files[0];
    console.log(event);
    console.log(file);
    // insertDocument(file);

    //conversione in base64:
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      insertDocument(reader.result as unknown as Blob);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const { mutate: insertDocument } = useMutation({
    mutationKey: ["create-medical-day"],
    mutationFn: async (selectedFile: Blob) => {
      console.log(selectedFile);
      const formData = new FormData();
      formData.append("file", selectedFile as unknown as Blob); // Aggiungi il file al FormData

      // Aggiungi altre proprietà al corpo della richiesta
      const requestBody = {
        idoneo: false,
        rinnovoScadenzaIdoneita: "2025-02-05",
        prescrizione: "ciao",
        visitaId: visitId,
      };

      formData.append("body", JSON.stringify(requestBody));

      // Esegui la chiamata API con il FormData
      return await new VisitaMedicaControllerApi().uploadCertificato(
        requestBody.idoneo,
        requestBody.rinnovoScadenzaIdoneita,
        requestBody.prescrizione,
        requestBody.visitaId,
        { file: formData as unknown as Blob },
        { headers: { "Content-Type": "multipart/form-data" } },
      );
    },
  });

  const isAttachmentPresent = attachmentId !== null;

  const handleClick = useCallback(() => {
    if (isAttachmentPresent) {
      window.location.href =
        "http://localhost:8080/api/visita-medica/visite/" +
        visitId +
        "/certificato";
    } else {
      // TODO: Handle upload
      //modale con info idoneo, prescrizione, data, e input type = file con invia fai richiesta al aserver passando i parametri
    }
  }, [isAttachmentPresent, visitId]);

  //si fa redirect sul path dove sta  l'immagine

  return (
    <IconButton color="secondary" onClick={handleClick}>
      {isAttachmentPresent ? (
        <DownloadForOfflineIcon />
      ) : (
        <label
          htmlFor="file-upload"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="file"
            id="file-upload"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <FileUploadIcon />
        </label>
      )}
    </IconButton>
  );
}

export default AttachmentHandler;
