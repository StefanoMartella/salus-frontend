import Chip, { ChipProps } from "@mui/material/Chip";
import { MedicalDayDTOStatoMedicalDayEnum } from "../../api";

type Props = ChipProps & {
  state: MedicalDayDTOStatoMedicalDayEnum;
};

function MedicalDayState({ state, ...rest }: Props) {
  return (
    <Chip
      label={
        state === MedicalDayDTOStatoMedicalDayEnum.COMPLETO
          ? "Completo"
          : "In lavorazione"
      }
      color={
        state === MedicalDayDTOStatoMedicalDayEnum.COMPLETO
          ? "success"
          : "warning"
      }
      {...rest}
    />
  );
}

export default MedicalDayState;
