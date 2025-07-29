import diognesisData from "../data/diagnoses";
import patientData from "../data/patients";
import {
  Diagnoses,
  NewEntry,
  filteredPatient,
  NewPatient,
  Patient,
} from "../types";

import { v1 as uuid } from "uuid";

export function getAllDiagnoses(): Diagnoses[] {
  return diognesisData;
}

export function getAllPatients(): filteredPatient[] {
  return patientData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
}

// Get the patient with the correct given parameter ID
export function getOnePatient(paramID: string): Patient {
  return patientData.filter((patient) => patient.id === paramID)[0];
}

export function postOnePatient(dataObject: NewPatient) {
  const newPatient = {
    id: uuid(),
    ...dataObject,
  };
  patientData.push(newPatient);

  return newPatient;
}

export function addEntryToPatient(
  entry: NewEntry,
  userID: string
): Patient | undefined {
  const foundPatientData = patientData.find((patient) => patient.id === userID);
  if (foundPatientData) {
    foundPatientData.entries.push({ id: uuid(), ...entry });
    return foundPatientData;
  }
  return undefined;
}
