import z from "zod";

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export const newEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.iso.date(),
  comment: z.string().optional(),
});

// It is diary entry but omits the id field
export type NewDiaryEntry = Omit<DiaryEntry, "id">;
