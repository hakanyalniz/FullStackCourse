import { NewPatient } from "../types";

// Custom type guards

const isString = (input: unknown): input is string => {
  return typeof input === "string";
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

function isValidSSNFormat(input: string): boolean {
  const pattern = /^\d{6}-\d{2,}$/;
  return pattern.test(input);
}

function isGender(input: string): boolean {
  return ["male", "female", "unknown"].includes(input);
}

// Parsers for type checking and narrowing

function parsePatientName(patientName: unknown): string {
  if (!isString(patientName)) {
    throw new Error("Incorrect or missing data.");
  }
  return patientName;
}

function parsePatientDate(patientDate: unknown): string {
  if (!isString(patientDate) || !isDate(patientDate)) {
    throw new Error("Incorrect or missing data.");
  }
  return patientDate;
}

function parsePatientSsn(patientSsn: unknown): string {
  if (!isString(patientSsn) || !isValidSSNFormat(patientSsn)) {
    throw new Error("Incorrect or missing data.");
  }
  return patientSsn;
}

function parsePatientGender(patientGender: unknown): string {
  if (!isString(patientGender) || !isGender(patientGender)) {
    throw new Error("Incorrect or missing data.");
  }

  return patientGender;
}

function parsePatientOccupation(patientOccupation: unknown): string {
  if (!isString(patientOccupation)) {
    throw new Error("Incorrect or missing data.");
  }
  return patientOccupation;
}

// This is the function that processes the POST data and validates and verifies them
function processNewPatientEntry(newPatient: unknown): NewPatient {
  // Check if the data exists or is type object
  // Check if the correct data entries exist in object in else if
  if (!newPatient || !(typeof newPatient === "object")) {
    throw new Error("Incorrect or missing data.");
  } else if (
    !("name" in newPatient) ||
    !("dateOfBirth" in newPatient) ||
    !("ssn" in newPatient) ||
    !("gender" in newPatient) ||
    !("occupation" in newPatient)
  ) {
    throw new Error("Incorrect or missing data.");
  }

  // Validate that each data's type is as expected
  return {
    name: parsePatientName(newPatient.name),
    dateOfBirth: parsePatientDate(newPatient.dateOfBirth),
    ssn: parsePatientSsn(newPatient.ssn),
    gender: parsePatientGender(newPatient.gender),
    occupation: parsePatientOccupation(newPatient.occupation),
  };
}

export default {
  processNewPatientEntry,
};
