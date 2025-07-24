// This file has two jobs. Validate data sent from users through POST
// and validate and confirm types for the data in the server

// It seems, due to following the exercise, this file no longer is used for validating POST data but rather to validate
// server side data and assign types to them

import { NewPatient, Gender, Entry } from "../types";

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

// Checks and validates Entry data
function isEntry(input: unknown): input is Entry {
  if (
    typeof input === "object" &&
    input !== null &&
    typeof (input as Entry).id === "string" &&
    typeof (input as Entry).description === "string" &&
    typeof (input as Entry).date === "string" &&
    typeof (input as Entry).specialist === "string"
  )
    return true;
  else {
    return false;
  }
}

function isEntryArray(input: unknown): input is Entry[] {
  // Is an array and has items inside it
  if (Array.isArray(input)) {
    // Each item inside the array is a legible entry
    // If they are not, return false, if they are, return true
    for (const entry of input) {
      if (!isEntry(entry)) {
        return false;
      }
    }
    return true;
  }
  return false;
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

function parseEntries(patientEntries: unknown): Entry[] {
  if (!patientEntries || !isEntryArray(patientEntries)) {
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
