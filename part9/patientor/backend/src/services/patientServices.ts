import diognesisData from "../data/diagnoses";
import patientData from "../data/patients";
import { Diagnoses, filteredPatient } from "../types";

export function getAllDiagnoses(): Diagnoses[] {
  return diognesisData;
}

export function getAllPatients(): filteredPatient[] {
  return patientData.map((patient) => ({
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
}
