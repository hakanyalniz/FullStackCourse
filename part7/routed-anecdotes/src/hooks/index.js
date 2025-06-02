import { useState } from "react";

export const useField = (type, name) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const resetField = () => {
    setValue("");
  };

  // The below returned values in inputProps are the exact same values required in the input field of a form
  // Because of this we can easily spread the hook, therefore making things look neat and simple, abstracting away this messy stuff
  // The resetField and inputProps is particularly clever, because obviously resetField is not something available in input field, this would cause error
  // so we seperate them like this
  return {
    inputProps: {
      type,
      name,
      value,
      onChange,
    },
    resetField,
  };
};
