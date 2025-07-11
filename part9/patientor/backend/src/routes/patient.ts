import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Fetching all diaries!");
  res.send("Saving a diary!");
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
