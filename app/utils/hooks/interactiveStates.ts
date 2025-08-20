import { useCallback, useState } from "react";

const useInteractiveStates = () => {
  const [lostFocus, setLostFocus] = useState(true);

  const onBlur = useCallback(() => {
    setLostFocus(true);
  }, []);

  const onFocus = useCallback(() => {
    setLostFocus(false);
  }, []);

  return {
    lostFocus,
    onBlur,
    onFocus,
  };
};

export default useInteractiveStates;
