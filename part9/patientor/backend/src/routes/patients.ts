import express, { NextFunction, Request, Response } from "express";
import {
  getAllPatients,
  postOnePatient,
  getOnePatient,
  addEntryToPatient,
} from "../services/patientServices";
import {
  newPatientEntrySchema,
  EntrySchema,
  NewPatient,
  Patient,
  Entry,
} from "../types";
import z from "zod";

const router = express.Router();

router.get("/patients", (_req, res) => {
  res.json(getAllPatients());
});

router.get("/patients/:id", (req, res) => {
  const id = req.params.id;
  const patientFilterResult = getOnePatient(id);
  res.send(patientFilterResult);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newPatientEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    req.body = EntrySchema.parse(req.body);
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
  "/patients",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    // validates the POST request data against the various types
    const newPatient = postOnePatient(req.body);
    res.json(newPatient);
  }
);

router.post(
  "/patients/:id/entries",
  newPatientEntryParser,
  (req: Request<{ id: string }, unknown, Entry>, res: Response) => {
    if (req.params && !req.params.id) {
      res.status(400).send("Missing Data!");
      return;
    }

    const userID = req.params.id;
    const addEntryResult = addEntryToPatient(req.body, userID);
    res.send(addEntryResult);
  }
);

router.use(errorMiddleware);

export default router;
