interface MultiplyValues {
  value1: number;
  value2: number;
}

// The return type is an object with values of type number
// This function allows us to validate the given arguments
// If we were to give a string in arguments, we would get NaN from Number(), since NaN is of type number
// typescript does not raise errors, which is problematic. So we manually validate input
export function parseArguments(args: string[]): MultiplyValues {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
}
