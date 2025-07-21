import { useEffect } from "react";
import { fetchAllDiaries } from "../services/diary-services";
import type { DiariesProps } from "../types";

function Diaries({ allDiaries, setAllDiaries }: DiariesProps) {
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
  }, [setAllDiaries]);

  return (
    <>
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
          {allDiaries.map((diary, index) => {
            return (
              <tr key={index}>
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
