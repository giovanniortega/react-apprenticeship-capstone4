import { useState } from "react";

const useInput = (validateValue: (enteredValuevalue: any) => boolean) => {
  const [enteredValue, seteEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (evt: any) => {
    seteEnteredValue(evt.target.value);
  };

  const blurInputHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    seteEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    blurInputHandler,
    reset,
  };
};

export default useInput;
