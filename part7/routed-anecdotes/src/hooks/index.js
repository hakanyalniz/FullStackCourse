import { useState } from "react";

// We declare it here then assign value to it later so we can export it seperately, therefore avoid returning it with useField
// this is required because not doing so would cause problems when we use spread operator on input
// all of the other returned values are required values for the input tag, but not the resetField function
// let resetField;

export const useField = (type, name) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const resetField = () => {
    setValue("");
  };

  return {
    type,
    name,
    value,
    onChange,
    resetField,
  };
};

// export { resetField };
