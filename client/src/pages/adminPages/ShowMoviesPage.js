import movieApi from 'api/movieApi';

import MovieListTable from 'components/Movies/MovieListTable';
import Filter from 'components/ui/Filter';
import Pagination from 'components/ui/Pagination';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ShowMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [perPage, setPerPage] = useState(5);
  const [filter, setFilter] = useState({
    sortBy: 'createdAt:desc',
  });

  async function getMovies(filteroptions) {
    try {
      const response = await movieApi.getMovies({
        ...filteroptions,
      });
      setMovies(response.data.results);
      // setTotalPages(5);
      setTotalPages(response.data.totalPages);
      setTotalResults(response.data.totalResults);
    } catch (err) {
      setError(err.response.data.message);
    }
  }
  useEffect(() => {
    getMovies({
      ...filter,
      page: currentPage,
      limit: perPage,
    });
  }, [currentPage, perPage]);

  async function deleteMovie(id, movieName) {
    if (window.confirm(`Do you want to delete ${movieName}?`)) {
      await movieApi.deleteMovie(id);
      getMovies();
    }
  }

  function handleFilter() {
    getMovies();
  }

  function handlePageClick(event) {
    setCurrentPage(event.selected + 1);
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
      <Pagination
        totalResults={totalResults}
        handlePageClick={handlePageClick}
        totalPages={totalPages}
      />
    </div>
  );
}

export default ShowMoviesPage;
