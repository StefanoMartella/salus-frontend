import { EventoDTOTipologiaEventoEnum } from "../api";

export function getLabelForEventType(
  eventType?: EventoDTOTipologiaEventoEnum,
): string {
  switch (eventType) {
    case EventoDTOTipologiaEventoEnum.VISITAMEDICAEFFETTUATA:
      return "Visita medica effettuata";
    case EventoDTOTipologiaEventoEnum.VISITAMEDICAANNULLATA:
      return "Visita medica annullata";
    case EventoDTOTipologiaEventoEnum.VISITAMEDICACONCLUSA:
      return "Visita medica conclusa";
    case EventoDTOTipologiaEventoEnum.VISITAMEDICANONEFFETTUATA:
      return "Visita medica non effettuata";
    case EventoDTOTipologiaEventoEnum.VISITAMEDICASCADUTA:
      return "Visita medica scaduta";
    case EventoDTOTipologiaEventoEnum.VISITAMEDICAPRENOTATA:
      return "Visita medica prenotata";
    case EventoDTOTipologiaEventoEnum.SCADENZAVISITAMODIFICATA:
      return "Scadenza visita medica";
    case EventoDTOTipologiaEventoEnum.ELIMINATOCERTIFICATOMEDICO:
      return "Certificato medico eliminato";
    case EventoDTOTipologiaEventoEnum.ALLEGATOCERTIFICATOMEDICO:
      return "Certificato medico allegato";
    case EventoDTOTipologiaEventoEnum.ASSEGNATOILMEDICALDAY:
      return "Medical day assegnato";
    default:
      return "";
  }
}
