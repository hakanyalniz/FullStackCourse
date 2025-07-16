import z from "zod";

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
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// Since the id is added server side, the POST request from user does not have id
export type NewPatient = Omit<Patient, "id">;

export type filteredPatient = Pick<
  Patient,
  "name" | "dateOfBirth" | "gender" | "occupation"
>;

export const newPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().regex(/^\d{6}-\d{2,}[A-Za-z]*$/),
  gender: z.enum(Gender),
  occupation: z.string(),
});
