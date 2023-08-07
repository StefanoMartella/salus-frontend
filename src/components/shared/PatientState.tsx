import Chip, { ChipProps } from "@mui/material/Chip";
import { DipendenteStatoAssunzioneEnum } from "../../api/models/dipendente";

type Props = ChipProps & {
  state: DipendenteStatoAssunzioneEnum;
};

function getLabelAndColor(
  state: DipendenteStatoAssunzioneEnum,
): [string, "info" | "success" | "warning" | "error"] {
  switch (state) {
    case DipendenteStatoAssunzioneEnum.FERIE:
      return ["Ferie", "info"];
    case DipendenteStatoAssunzioneEnum.ATTIVO:
      return ["Attivo", "success"];
    case DipendenteStatoAssunzioneEnum.DIMESSO:
      return ["Dimesso", "success"];
    case DipendenteStatoAssunzioneEnum.CONGEDOPARENTALE:
      return ["Congedo parentale", "warning"];
  }
}

function PatientState({ state, ...rest }: Props) {
  const [label, color] = getLabelAndColor(state);

  return <Chip {...{ label, color }} {...rest} />;
}

export default PatientState;
