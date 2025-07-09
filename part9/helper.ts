interface calculatorValues {
  values: number[];
}

// The return type is an object with values of type number
// This function allows us to validate the given arguments
// If we were to give a string in arguments, we would get NaN from Number(), since NaN is of type number
// typescript does not raise errors, which is problematic. So we manually validate input
export function parseArguments(args: string[]): calculatorValues {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 10) throw new Error("Too many arguments");

  const resultValues = args.slice(2).map((value) => {
    const valueTurnedNumber = Number(value);

    if (!isNaN(valueTurnedNumber)) {
      return valueTurnedNumber;
    } else {
      throw new Error("Provided values were not numbers!");
    }
  });

  return { values: resultValues };
}
