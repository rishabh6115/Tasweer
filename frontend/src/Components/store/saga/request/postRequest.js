import axios from "axios";

export const allPostRequest = () => {
  const config = {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  };
  return axios.get(`${process.env.REACT_APP_BACKEND}/api/post/`, config);
};
