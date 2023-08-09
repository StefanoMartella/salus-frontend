import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from "@mui/material/IconButton/IconButton";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { VisitaMedicaControllerApi } from "../../api";

type Props = {
  visitId: number;
  attachmentId: string | null;
};

function AttachmentHandler({ visitId, attachmentId }: Props) {
  const isAttachmentPresent = attachmentId !== null;
  const { refetch: downloadAttachment } = useQuery({
    queryKey: ["download-attachment", attachmentId],
    queryFn: () => new VisitaMedicaControllerApi().downloadDocument(visitId),
    select: (response) => response.data,
    enabled: false,
  });

  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      if (isAttachmentPresent) {
        downloadAttachment().then((response) => {
          console.log("Blob:", response);
          const blob = response.data;
          // Create blob link to download
          if (blob) {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `alluka.png`);
            link.click();
            URL.revokeObjectURL(url);
          } else {
            console.log("Che palle");
          }
        });
      } else {
        // TODO: Handle upload
      }
    }, [downloadAttachment, isAttachmentPresent]);

  return (
    <IconButton color="secondary" onClick={handleClick}>
      {isAttachmentPresent ? <DownloadForOfflineIcon /> : <FileUploadIcon />}
    </IconButton>
  );
}

export default AttachmentHandler;
