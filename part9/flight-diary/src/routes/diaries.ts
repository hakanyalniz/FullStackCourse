import express from "express";
import diaryServices from "../services/diaryServices";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Fetching all diaries!");

  res.json(diaryServices.getEntries());
});

router.get("/:id", (req, res) => {
  const paramID = req.params.id;
  const diary = diaryServices.findById(Number(paramID));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
router.post("/", (req, res) => {
  const { date, weather, visibility, comment } = req.body;
  const addedEntry = diaryServices.addDiary({
    date,
    weather,
    visibility,
    comment,
  });
  res.json(addedEntry);
});

export default router;
