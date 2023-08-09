import { DependencyList, EffectCallback, useEffect } from "react";
import { useIsFirstRender } from "./useIsFirstRender";

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  //se è il primo render, isFirst sarà true e quindi l'istruzione if non si eseguirà e non partirà l'effetto
  //se invece è false, la condizione sarà true e partirà l'effetto
  //l'useEffect viene chiamato solo se cambiano i deps, ossia un array di elementi
  //sia effect che deps ci vengono passati dal componente chiamante
  const isFirst = useIsFirstRender();

  useEffect(() => {
    if (!isFirst) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
