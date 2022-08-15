import axios from "axios";

export const allPostRequest = () => {
  const config = {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  };
  return axios.get("/api/post/", config);
};
