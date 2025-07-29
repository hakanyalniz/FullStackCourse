// Some of the types and validation does not use zod because of the way the exercises went

import z from "zod";

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: { startDate: string; endDate: string };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: { date: string; criteria: string };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// Since the id is added server side, the POST request from user does not have id
export type NewPatient = Omit<Patient, "id">;

export type filteredPatient = Omit<Patient, "ssn" | "entries">;

export const newPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().regex(/^\d{6}-\d{2,}[A-Za-z]*$/),
  gender: z.enum(Gender),
  occupation: z.string(),
});

// Schema for entries
const patientBaseEntrySchema = z.object({
  id: z.string().min(3),
  description: z.string().min(3),
  date: z.string().min(3),
  specialist: z.string().min(3),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = patientBaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

const HospitalEntrySchema = patientBaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({ date: z.string(), criteria: z.string() }),
});

const OccupationalHealthcareEntry = patientBaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({ startDate: z.string(), endDate: z.string() }),
});

export const EntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  HealthCheckEntrySchema,
  OccupationalHealthcareEntry,
]);

// The above entry schema are for complete Entry field that is available on data
// the below are for the one sent by the user, here the ID field is missing
// since the field is added in the backend
// so when we receive the entry data, we validate it while ommiting id
// then we will add id and change the type from new to the above entry type
const NewPatientBaseEntryschema = patientBaseEntrySchema.omit({ id: true });

const NewHealthCheckEntrySchema = NewPatientBaseEntryschema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

const NewHospitalEntrySchema = NewPatientBaseEntryschema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({ date: z.string(), criteria: z.string() }),
});

const NewOccupationalHealthcareEntry = NewPatientBaseEntryschema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({ startDate: z.string(), endDate: z.string() }),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  NewHealthCheckEntrySchema,
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntry,
]);

export type NewEntry = z.infer<typeof NewEntrySchema>;
