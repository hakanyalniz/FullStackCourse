import "./App.css";
import Diaries from "./components/Diaries";
import AddDiary from "./components/addDiary";

import { useState } from "react";
import type { DiaryEntry } from "./types";

function App() {
  const [allDiaries, setAllDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <>
      <h1>Flight Diaries</h1>
      <Diaries allDiaries={allDiaries} setAllDiaries={setAllDiaries} />

      <div className="error-notification">{errorMessage}</div>
      <AddDiary
        setAllDiaries={setAllDiaries}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
}

export default App;
