import axios from 'axios';

const BASE_URL = process.env.React_APP_BACKEND_ROOT;

async function addMovies(data) {
  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.post(`${BASE_URL}/movie/addmovie`, data);
  } catch (error) {
    throw error;
  }
}

async function updateMovie(id, updatedData) {
  const response = await axios.put(
    `${BASE_URL}/movie/updatemovie/${id}`,
    updatedData
  );

  return response;
}

async function getMovies(filterOptions) {
  const response = await axios.get(`${BASE_URL}/movie/`);
  return response;
}

async function getMovie(id) {
  const response = await axios.get(`${BASE_URL}/movie/${id}`);
  return response;
}

export default {
  addMovies,
  updateMovie,
  getMovies,
  getMovie,
};
