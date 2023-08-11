import { VisitaMedicaDTOStatoVisitaMedicaEnum } from "../../api";
import Chip, { ChipProps } from "@mui/material/Chip";

type Props = ChipProps & {
  state: VisitaMedicaDTOStatoVisitaMedicaEnum;
};

function getLabelAndColor(
  state: VisitaMedicaDTOStatoVisitaMedicaEnum,
): [string, "success" | "warning" | "error"] {
  switch (state) {
    case VisitaMedicaDTOStatoVisitaMedicaEnum.INSERITA:
      return ["Inserita", "warning"];
    case VisitaMedicaDTOStatoVisitaMedicaEnum.EFFETTUATA:
      return ["Effettuata", "success"];
    case VisitaMedicaDTOStatoVisitaMedicaEnum.NONEFFETTUATA:
      return ["Non effettuata", "error"];
  }
}

function MedicalVisitState({ state, ...rest }: Props) {
  const [label, color] = getLabelAndColor(state);

  return <Chip {...{ label, color }} {...rest} />;
}

export default MedicalVisitState;
