import movieApi from 'api/movieApi';
import MovieListTable from 'components/Movies/MovieListTable';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

function ShowMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  async function getMovies() {
    try {
      const response = await movieApi.getMovies({
        limit: 2,
        page: 1,
      });
      setMovies(response.data.results);
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  async function deleteMovie(id, movieName) {
    if (window.confirm(`Do you want to delete ${movieName}?`)) {
      await movieApi.deleteMovie(id);
      getMovies();
    }
  }

  return (
    <div>
      <div className="flex justify-start items-center space-x-2 mb-4">
        <div className="text-xl">Movies</div>
        <Link
          to="/admin/addmovie"
          className="p-2 bg-red-700 text-sm text-white"
        >
          Add Movie
        </Link>
      </div>
      {error && <div>{error}</div>}
      <MovieListTable movies={movies} deleteMovie={deleteMovie} />
    </div>
  );
}

export default ShowMoviesPage;
