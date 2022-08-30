import React from 'react';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from 'utilities/utils';

export default function MovieListTable({ movies }) {
  return (
    <div className="overflow-x-auto relative border rounded">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Movie Title
            </th>
            <th scope="col" className="py-3 px-6">
              Release Date
            </th>
            <th scope="col" className="py-3 px-6">
              Poster
            </th>
            <th scope="col" className="py-3 px-6">
              tmdb_id
            </th>
            <th scope="col" className="py-3 px-6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {movies &&
            movies.map((movie) => (
              <tr
                key={movie._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/admin/movie/edit/${movie._id}`}>
                    {capitalizeFirstLetter(movie.title)}
                  </Link>
                </th>
                <td className="py-4 px-6">{movie.release_date}</td>
                <td className="py-4 px-6">{movie.poster ? 'true' : 'false'}</td>
                <td className="py-4 px-6">{movie.tmdb_id}</td>
                <td className="py-4 px-6">
                  Delete{'  '}
                  <Link
                    to={`/admin/movie/edit/${movie._id}`}
                    className="text-blue-400"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
