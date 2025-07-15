import express from "express";
import cors from "cors";

import patientRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";

const app = express();

app.use(express.json());
app.use(cors()); // Allow all origins (for development)

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/", patientRouter);
app.use("/api/", diagnosesRouter);

app.get("/", (_req, res) => {
  res.send("Routes: /api , /api/ping , /api/diagnoses , /api/patients");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
