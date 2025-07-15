import express from "express";
import { getAllPatients, postOnePatient } from "../services/patientServices";

const router = express.Router();

router.get("/patients", (_req, res) => {
  res.json(getAllPatients());
});

router.post("/patients", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatient = postOnePatient(req.body);

  res.json(newPatient);
});

export default router;
