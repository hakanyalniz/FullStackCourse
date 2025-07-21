import { useEffect, useState } from "react";
import { fetchAllDiaries } from "../services/diary-services";
import type { DiaryEntry } from "../types";

function Diaries() {
  const [allDiaries, setAllDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allDiaryResult = await fetchAllDiaries();
        setAllDiaries(allDiaryResult);
      } catch (error) {
        console.error("Error fetching diaries:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Visibility</th>
            <th>Weather</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {allDiaries.map((diary) => {
            return (
              <tr>
                <td>{diary.date}</td>
                <td>{diary.visibility}</td>
                <td>{diary.weather}</td>
                <td>{diary.comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Diaries;
