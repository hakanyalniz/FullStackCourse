import diognesisData from "../data/diagnoses";
import { Diagnosis } from "../types";

export function getAllPatients(): Diagnosis[] {
  return diognesisData;
}
