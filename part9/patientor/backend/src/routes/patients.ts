import express from "express";
import { getAllPatients, postOnePatient } from "../services/patientServices";
import patientEntryUtil from "../util/patientEntryUtil";

const router = express.Router();

router.get("/patients", (_req, res) => {
  res.json(getAllPatients());
});

router.post("/patients", (req, res) => {
  // validates the POST request data against the various types
  const newPatientEntry = patientEntryUtil.processNewPatientEntry(req.body);

  const newPatient = postOnePatient(newPatientEntry);

  res.json(newPatient);
});

export default router;
