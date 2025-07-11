import express from "express";
import { getAllPatients } from "../services/patientServices";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Fetching all diaries!");
  res.json(getAllPatients());
});

export default router;
