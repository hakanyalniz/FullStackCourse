import express from "express";
import diaryServices from "../services/diaryServices";
import utils from "../services/utils";

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

router.post("/", (req, res) => {
  console.log("POST request received!");

  try {
    // Makes sure that the post request we get is validated and verified
    const newDiaryEntry = utils.toNewDiaryEntry(req.body);

    const addedEntry = diaryServices.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage +=
        " Error: " + error.message + ". Received data: " + req.body;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
