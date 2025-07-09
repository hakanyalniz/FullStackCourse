import { parseArguments } from "./helper";

interface exerciseInterface {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(
  exerciseList: number[],
  trainingTarget: number
): exerciseInterface {
  const periodLength = exerciseList.length;
  const trainingDays = exerciseList.filter((exercise) => exercise > 0).length; // filter the 0 numbers out then take length
  const targetValue = trainingTarget;
  let totalHours = 0;

  exerciseList.forEach((exercise) => {
    totalHours += exercise;
  });

  const averageTime = totalHours / periodLength;
  const success = averageTime >= targetValue;
  let rating = 0;
  let ratingDescription = "";

  if (success && averageTime >= targetValue + 2) {
    rating = 3;
    ratingDescription = "Target exceeded!";
  } else if (success) {
    rating = 2;
    ratingDescription = "Target reached.";
  } else if (!success && averageTime + 2 <= targetValue) {
    rating = 0;
    ratingDescription = "Target completely failed.";
  } else if (!success) {
    rating = 1;
    ratingDescription = "Target failed.";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetValue,
    average: averageTime,
  };
}

const { values } = parseArguments(process.argv);

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
// console.log(calculateExercises([5, 5, 5, 6, 5, 5, 5], 2));
// console.log(calculateExercises([0, 1, 1, 0, 0, 2, 1], 2));
// console.log(calculateExercises([0, 0, 0, 0, 0, 0, 0], 2));

// Using slice, we get all the arguments except the first one, which is the target
// we then use the first one as second argument
console.log(calculateExercises([...values.slice(1)], values[0]));
