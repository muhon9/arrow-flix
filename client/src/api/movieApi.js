import axios from 'axios';
import authInstance from 'axios/authInstance';

const BASE_URL = process.env.React_APP_BACKEND_ROOT;

async function addMovies(data) {
  // eslint-disable-next-line no-useless-catch
  try {
    return await authInstance.post(`/movie/addmovie`, data);
  } catch (error) {
    throw error;
  }
}

async function deleteMovie(id) {
  // eslint-disable-next-line no-useless-catch
  try {
    return await authInstance.delete(`movie/${id}`);
  } catch (error) {
    throw error;
  }
}

async function updateMovie(id, updatedData) {
  const response = await authInstance.put(
    `/movie/updatemovie/${id}`,
    updatedData
  );

  return response;
}

async function getMovies(filterOptions) {
  let queryString = '';
  Object.keys(filterOptions).forEach((key) => {
    queryString += `${key}=${filterOptions[key]}&`;
  });

  const response = await axios.get(`${BASE_URL}/movie?${queryString}`);

  return response;
}

async function getMovie(id) {
  const response = await axios.get(`${BASE_URL}/movie/${id}`);

  return response;
}

async function searchContentByQuery(query) {
  const response = await axios.get(`${BASE_URL}/movie/search?q=${query}`);
  return response.data;
}

export default {
  addMovies,
  deleteMovie,
  updateMovie,
  getMovies,
  getMovie,
  searchContentByQuery,
};
