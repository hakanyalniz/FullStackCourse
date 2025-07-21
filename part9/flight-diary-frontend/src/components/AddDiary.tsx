import { postDiary, fetchAllDiaries } from "../services/diary-services";
import { useState, useEffect } from "react";
import type { AddDiariesProps } from "../types";
import { Visibility, Weather } from "../types";

function AddDiary({ setAllDiaries, setErrorMessage }: AddDiariesProps) {
  const [diaryObject, setDiaryObject] = useState({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });

  const handleSend = async () => {
    console.log("Sending:", diaryObject);

    const postDiaryResult = await postDiary({
      date: diaryObject.date,
      weather: diaryObject.weather,
      visibility: diaryObject.visibility,
      comment: diaryObject.comment,
    });

    setDiaryObject({
      date: "",
      weather: "",
      visibility: "",
      comment: "",
    });

    if (postDiaryResult.statusText) {
      let message = "An error occured. ";
      postDiaryResult.errors.map(
        (error: { code: string; message: string }) =>
          (message += `\n Code: ${error.code} Message: ${error.message}.`)
      );
      console.log(message);

      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 30000);
    }
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
          type="date"
          value={diaryObject.date}
          onChange={(e) =>
            setDiaryObject({ ...diaryObject, date: e.target.value })
          }
        />
      </div>

      <div>
        {Object.values(Visibility).map((v) => (
          <label key={v}>
            {v}
            <input
              type="radio"
              name="visibility"
              value={v}
              onChange={(e) =>
                setDiaryObject({ ...diaryObject, visibility: e.target.value })
              }
            />
          </label>
        ))}
      </div>

      <div>
        {Object.values(Weather).map((v) => (
          <label key={v}>
            {v}
            <input
              type="radio"
              name="weather"
              value={v}
              onChange={(e) =>
                setDiaryObject({ ...diaryObject, weather: e.target.value })
              }
            />
          </label>
        ))}
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
