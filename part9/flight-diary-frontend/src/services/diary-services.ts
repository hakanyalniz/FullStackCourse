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

export async function postDiary(postData: unknown) {
  try {
    const postDiaryResult = await axios.post(`${BASEURL}/diaries`, postData);

    return postDiaryResult.data;
  } catch (error: unknown) {
    const errorMessage = {
      statusText: "Something went wrong. ",
      status: 0,
      errors: [],
    };

    if (axios.isAxiosError(error) && error.status && error.response) {
      errorMessage.statusText += error.response?.statusText;
      errorMessage.status = error.status;
      errorMessage.errors = error.response.data.error;
      return errorMessage;

      // throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}
