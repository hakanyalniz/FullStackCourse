import express from "express";
import { getAllDiagnoses } from "../services/patientServices";

const router = express.Router();

router.get("/diagnosis", (_req, res) => {
  res.json(getAllDiagnoses());
});

export default router;
