import axios from "axios";
import { NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getOne = async (paramID: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${paramID}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (entry: NewEntry, userID: string) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${userID}/entries`,
    entry
  );

  return data;
};

export default {
  getAll,
  getOne,
  create,
  createEntry,
};
