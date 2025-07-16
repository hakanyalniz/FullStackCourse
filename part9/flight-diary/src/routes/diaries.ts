import express, { Request, Response, NextFunction } from "express";
import diaryServices from "../services/diaryServices";

import { NewEntrySchema, DiaryEntry, NewDiaryEntry } from "../types";
import z from "zod";

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

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newDiaryParser,
  (
    req: Request<unknown, unknown, NewDiaryEntry>,
    res: Response<DiaryEntry>
  ) => {
    const addedEntry = diaryServices.addDiary(req.body);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
