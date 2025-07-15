import express from "express";
import { getAllPatients } from "../services/patientServices";

const router = express.Router();

router.get("/patients", (_req, res) => {
  res.json(getAllPatients());
});

export default router;
