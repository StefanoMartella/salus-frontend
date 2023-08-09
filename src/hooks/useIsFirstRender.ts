//Questo hook viene utilizzato per determinare se il componente sta eseguendo il render per la prima volta o se è una renderizzazione successiva (aggiornamento).
//al primo render, verrà settato isFirst da true a false, dal secondo render sarà restituito solo false
//poi con l'hook useUpdateEffect, farà sì che un certo effetto venga eseguito solo se isFirst è false
//penso che l'intenzione sia evitare che la chiamata HTTP per i dati della table scatenata dai filters in ContactFilters.tsx non avvenga al mount del component
import { useRef } from "react";

export function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}
