import React from "react";

const Weather = {
  Sunny: "sunny",
  Rainy: "rainy",
  Cloudy: "cloudy",
  Stormy: "stormy",
  Windy: "windy",
} as const;

const Visibility = {
  Great: "great",
  Good: "good",
  Ok: "ok",
  Poor: "poor",
} as const;

export type Weather = (typeof Weather)[keyof typeof Weather];
export type Visibility = (typeof Visibility)[keyof typeof Visibility];

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export interface DiariesProps {
  allDiaries: DiaryEntry[];
  setAllDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

export interface AddDiariesProps {
  setAllDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}
