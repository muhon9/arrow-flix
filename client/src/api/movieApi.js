import axios from 'axios';

async function addMovies(data) {
  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.post(`http://localhost:8000/api/movie/addmovie`, data);
  } catch (error) {
    throw error;
  }
}

export default {
  addMovies,
};
