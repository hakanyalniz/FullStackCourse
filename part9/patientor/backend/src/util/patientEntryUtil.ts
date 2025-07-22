import { NewPatient, Gender } from "../types";

// Custom type guards

const isString = (input: unknown): input is string => {
  return typeof input === "string";
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

function isValidSSNFormat(input: string): boolean {
  const pattern = /^\d{6}-\d{2,}[A-Za-z]*$/;
  return pattern.test(input);
}

function isGender(input: string): input is Gender {
  return Object.values(Gender)
    .map((gender: string) => gender.toString())
    .includes(input);
}

// Checks if input is array then checks if the items inside it are string
function isArray(input: unknown): input is string[] {
  return (
    Array.isArray(input) && input.every((item) => typeof item === "string")
  );
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

function parsePatientGender(patientGender: unknown): Gender {
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

function parseEntries(patientEntries: unknown): string[] {
  if (!patientEntries || !isArray(patientEntries)) {
    throw new Error("Incorrect or missing data.");
  }

  return patientEntries;
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
    !("occupation" in newPatient) ||
    !("entries" in newPatient)
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
    entries: parseEntries(newPatient.entries),
  };
}

export default {
  processNewPatientEntry,
};
