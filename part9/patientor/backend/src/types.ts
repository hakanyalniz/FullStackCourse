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
  gender: string;
  occupation: string;
}

export type Gender = "male" | "female" | "other";

// Since the id is added server side, the POST request from user does not have id
export type NewPatient = Omit<Patient, "id">;

export type filteredPatient = Pick<
  Patient,
  "name" | "dateOfBirth" | "gender" | "occupation"
>;
