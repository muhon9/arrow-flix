import movieApi from 'api/movieApi';
import MovieListTable from 'components/Movies/MovieListTable';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ShowMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await movieApi.getMovies();
        setMovies(response.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    }
    getMovies();
  }, []);

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
      <MovieListTable movies={movies} />
    </div>
  );
}

export default ShowMoviesPage;
