import axios from 'axios';

axios.defaults.baseURL = 'https://644ba1f917e2663b9df42e6f.mockapi.io';

export const getTweetsPagination = async ({ page = 1, limit = 3 }) => {
  const { data } = await axios.get(`/tweets?page=${page}&limit=${limit}`);
  return data;
};
