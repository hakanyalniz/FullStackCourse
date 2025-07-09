import { parseArguments } from "../helper";

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

const { value1, value2 } = parseArguments(process.argv);

multiplicator(
  value1,
  value2,
  `Multiplied numbers ${value1} and ${value2}, the result is:`
);

// Results in an error because does not match the type

// multiplicator(
//   "how about a string?",
//   4,
//   "Multiplied a string and 4, the result is:"
// );
