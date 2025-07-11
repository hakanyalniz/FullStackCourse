import express from "express";
import cors from "cors";

import patientRouter from "./routes/patient";

const app = express();

app.use(express.json());
app.use(cors()); // Allow all origins (for development)

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/patient", patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
