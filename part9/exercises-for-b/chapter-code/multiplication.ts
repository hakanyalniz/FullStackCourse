import { parseArguments } from "../helper";

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

// We receive an object values: number
// using {} allows us to deconstruct it and get the number
const { values } = parseArguments(process.argv);

multiplicator(
  values[0],
  values[1],
  `Multiplied numbers ${values[0]} and ${values[1]}, the result is:`
);

// Results in an error because does not match the type

// multiplicator(
//   "how about a string?",
//   4,
//   "Multiplied a string and 4, the result is:"
// );
