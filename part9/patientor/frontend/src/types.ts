import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
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

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export interface BasePatientProps {
  patient: Patient;
  diagnosisDescription: Diagnosis[];
}

export interface PatientProps {
  entry: Entry;
  diagnosisDescription: Diagnosis[];
}

export interface HospitalEntryProps extends PatientProps {
  entry: HospitalEntry;
}

export interface OccupationalHealthcareEntryProps extends PatientProps {
  entry: OccupationalHealthcareEntry;
}

export interface HealthCheckEntryProps extends PatientProps {
  entry: HealthCheckEntry;
}

export interface BaseEntryProps extends PatientProps {
  MedicalIcon: OverridableComponent<
    SvgIconTypeMap<NonNullable<unknown>, "svg">
  > & {
    muiName: string;
  };
}

// The above entry schema are for complete Entry field that is available on data
// the below are for the one sent by the user, here the ID field is missing
// since the field is added in the backend
// so when we receive the entry data, we validate it while ommiting id
// then we will add id and change the type from new to the above entry type
const NewPatientBaseEntryschema = z.object({
  description: z.string().min(1),
  date: z.string().min(1),
  specialist: z.string().min(1),
  diagnosisCodes: z.array(z.string()).optional(),
});

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

export interface EntryProps {
  handleEntryFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
}

// Move the validations to their own files
