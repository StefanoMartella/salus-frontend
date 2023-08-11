import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from "@mui/material/IconButton/IconButton";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { VisitaMedicaControllerApi } from "../../api";
import { BASE_PATH } from "../../api/base";
import { SERVER_DATE_FORMAT } from "../../utils/date-utils";
import CertificateForm, {
  CertificateFormValues,
} from "../forms/CertificateForm";
import AppModal from "./AppModal";

type Props = {
  visitId: number;
  attachmentId: string | null;
};

function AttachmentHandler({ visitId, attachmentId }: Props) {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const isAttachmentPresent = attachmentId !== null;
  const { mutate: uploadCertificate, isLoading } = useMutation({
    mutationKey: ["upload-certificate", visitId],
    mutationFn: async ({
      eligibility,
      eligibilityRenew,
      prescription,
      file,
    }: CertificateFormValues) => {
      const formData: FormData = new FormData();
      formData.set("idoneo", `${eligibility}`);
      formData.set(
        "rinnovoScadenzaIdoneita",
        `${eligibilityRenew.format(SERVER_DATE_FORMAT)}`,
      );
      formData.set("prescrizione", prescription);
      formData.set("visitId", `${visitId}`);
      formData.set("file", file);

      return new VisitaMedicaControllerApi().uploadCertificato(
        formData,
        visitId,
      );
    },
  });

  const handleClick = useCallback(() => {
    if (isAttachmentPresent) {
      window.location.href = `${BASE_PATH}/api/visita-medica/visite/${visitId}/certificato`;
    } else {
      setIsModalOpened(true);
    }
  }, [isAttachmentPresent, visitId]);

  return (
    <>
      <IconButton color="secondary" onClick={handleClick}>
        {isAttachmentPresent ? <DownloadForOfflineIcon /> : <FileUploadIcon />}
      </IconButton>
      <AppModal
        title="Inserimento certificato"
        open={isModalOpened}
        onClose={() => setIsModalOpened(false)}
      >
        <CertificateForm
          onSubmit={(values) => uploadCertificate(values)}
          loading={isLoading}
        />
      </AppModal>
    </>
  );
}

export default AttachmentHandler;
