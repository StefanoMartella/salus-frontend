import { MedicalDayDTOStatoMedicalDayEnum } from "../../api";
import Chip, { ChipProps } from "@mui/material/Chip";

type Props = ChipProps & {
  state: MedicalDayDTOStatoMedicalDayEnum;
};

function getLabelAndColor(
  state: MedicalDayDTOStatoMedicalDayEnum,
): [string, "success" | "warning"] {
  switch (state) {
    case MedicalDayDTOStatoMedicalDayEnum.COMPLETO:
      return ["Completo", "success"];
    case MedicalDayDTOStatoMedicalDayEnum.INLAVORAZIONE:
      return ["In lavorazione", "warning"];
  }
}

function MedicalDayState({ state, ...rest }: Props) {
  const [label, color] = getLabelAndColor(state);

  return <Chip {...{ label, color }} {...rest} />;
}

export default MedicalDayState;
