import axios from "axios";

axios.defaults.baseURL = "https://644ba1f917e2663b9df42e6f.mockapi.io";

export const getTweets = async () => {
  const { data } = await axios.get("/tweets");
  return data;
};
