// Creating custom types and using union types with string literals
type Operation = "multiply" | "add" | "divide";

// It is important to rememeber that the production ready code does not include types
// therefore it is important to not rely on types for error checking dynamic data
const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

const args = process.argv.slice(2); // Skip the first 2 node path and script path
try {
  console.log(args[0], args[1], args[2]);

  console.log(calculator(1, 5, "divide"));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  // here we can not use error.message because error is unknown, therefore it requires type narrowing or assertion to be used
  //  it is counterpart to any, which can be used even without any process. But that makes it unsafe
  if (error instanceof Error) {
    // the type is narrowed and we can refer to error.message
    // instanceof here is a type guard, which narrows the variable down to a type
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
