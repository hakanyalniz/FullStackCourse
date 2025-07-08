const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);

multiplicator(a, b, `Multiplied numbers ${a} and ${b}, the result is:`);

// Results in an error because does not match the type

// multiplicator(
//   "how about a string?",
//   4,
//   "Multiplied a string and 4, the result is:"
// );
