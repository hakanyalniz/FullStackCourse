import express from "express";
import { getAllDiagnoses, getAllPatients } from "../services/patientServices";

const router = express.Router();

router.get("/diagnoses", (_req, res) => {
  res.json(getAllDiagnoses());
});

router.get("/patients", (_req, res) => {
  res.json(getAllPatients());
});

export default router;
