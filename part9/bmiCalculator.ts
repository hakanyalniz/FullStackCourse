import { parseArguments } from "./helper";

export function calculateBmi(height: number, weight: number): string {
  // Convert centimeter to meter
  // 150 => 1.50
  const meterHeight: number = height / 100;

  // turn the float to fixed number
  const bmiResult: number = parseInt(
    (weight / (meterHeight * meterHeight)).toFixed(2)
  );

  if (bmiResult > 18.5 && bmiResult < 25.0) {
    return "Normal range";
  } else if (bmiResult < 18.5) {
    return "Underweight";
  } else if (bmiResult > 25.0) {
    return "Overweight";
  } else {
    return "An error occured";
  }
}

if (require.main === module) {
  const { values } = parseArguments(process.argv);

  console.log(calculateBmi(values[0], values[1]));
}

// 180, 74;
