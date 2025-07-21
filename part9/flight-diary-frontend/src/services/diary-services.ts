import axios from "axios";

const BASEURL = "http://localhost:3000/api";

export async function fetchAllDiaries() {
  try {
    const diaryResults = await axios.get(`${BASEURL}/diaries`);

    return diaryResults.data;
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return errorMessage;
  }
}
