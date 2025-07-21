import { postDiary, fetchAllDiaries } from "../services/diary-services";
import { useState, useEffect } from "react";
import type { AddDiaryWithoutSet } from "../types";

function AddDiary({ setAllDiaries }: AddDiaryWithoutSet) {
  const [diaryObject, setDiaryObject] = useState({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });

  const handleSend = () => {
    console.log("Sending:", diaryObject);
    postDiary({
      date: diaryObject.date,
      weather: diaryObject.weather,
      visibility: diaryObject.visibility,
      comment: diaryObject.comment,
    });
  };

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
      <h3>Add Diary</h3>
      <div>
        Date:
        <input
          type="text"
          value={diaryObject.date}
          onChange={(e) =>
            setDiaryObject({ ...diaryObject, date: e.target.value })
          }
        />
      </div>

      <div>
        Visibility:
        <input
          type="text"
          value={diaryObject.visibility}
          onChange={(e) =>
            setDiaryObject({ ...diaryObject, visibility: e.target.value })
          }
        />
      </div>

      <div>
        Weather:
        <input
          type="text"
          value={diaryObject.weather}
          onChange={(e) =>
            setDiaryObject({ ...diaryObject, weather: e.target.value })
          }
        />
      </div>

      <div>
        Comment:
        <input
          type="text"
          value={diaryObject.comment}
          onChange={(e) =>
            setDiaryObject({ ...diaryObject, comment: e.target.value })
          }
        />
      </div>

      <button onClick={handleSend}>Send</button>
    </>
  );
}

export default AddDiary;
