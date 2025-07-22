import diognesisData from "../data/diagnoses";
import patientData from "../data/patients";
import { Diagnoses, filteredPatient, NewPatient } from "../types";

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

export function postOnePatient(dataObject: NewPatient) {
  const newPatient = {
    id: uuid(),
    ...dataObject,
  };
  patientData.push(newPatient);

  return newPatient;
}
