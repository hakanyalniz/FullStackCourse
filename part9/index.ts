import express from "express";
const app = express();

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json()); // for application/json

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  // Turn into number, if not Number and get NaN, the validate will refuse it
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  // Checks if request is properly sent or if they are even numbers
  if (Object.keys(req.query).length < 2) {
    return res.status(400).send("Bad Request");
  } else if (!Number.isFinite(height) || !Number.isFinite(weight)) {
    return res.status(400).send("Bad Request");
  }

  const calculationResult = calculateBmi(height, weight);

  return res.json({ height, weight, bmi: calculationResult });
});

interface RequestBody {
  daily_exercises: number[];
  target: number;
}
app.post("/exercises", (req, res) => {
  const body = req.body as RequestBody;

  const daily_exercises: number[] = body.daily_exercises;
  const target: number = body.target;

  // Checks if the request is made up of array and number
  if (
    !Array.isArray(daily_exercises) ||
    typeof target !== "number" ||
    isNaN(target)
  ) {
    return res.status(400).send("Bad Request");
  }

  const exerciseResults = calculateExercises(daily_exercises, target);

  return res.json(exerciseResults);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
