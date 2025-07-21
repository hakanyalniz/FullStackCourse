import "./App.css";
import Diaries from "./components/Diaries";
import AddDiary from "./components/addDiary";

import { useState } from "react";
import type { DiaryEntry } from "./types";

function App() {
  const [allDiaries, setAllDiaries] = useState<DiaryEntry[]>([]);

  return (
    <>
      <h1>Flight Diaries</h1>
      <Diaries allDiaries={allDiaries} setAllDiaries={setAllDiaries} />

      <AddDiary setAllDiaries={setAllDiaries} />
    </>
  );
}

export default App;
