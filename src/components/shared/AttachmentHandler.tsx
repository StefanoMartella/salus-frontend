import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from "@mui/material/IconButton/IconButton";
import { useCallback } from "react";

type Props = {
  visitId: number;
  attachmentId: string | null;
};

function AttachmentHandler({ visitId, attachmentId }: Props) {
  const isAttachmentPresent = attachmentId !== null;

  const handleClick = useCallback(() => {
    if (isAttachmentPresent) {
      window.location.href =
        "http://localhost:8080/api/visita-medica/visite/" +
        visitId +
        "/certificato";
    } else {
      // TODO: Handle upload
    }
  }, [isAttachmentPresent, visitId]);

  //si fa redirect sul path dove sta  l'immagine

  return (
    <IconButton color="secondary" onClick={handleClick}>
      {isAttachmentPresent ? <DownloadForOfflineIcon /> : <FileUploadIcon />}
    </IconButton>
  );
}

export default AttachmentHandler;
