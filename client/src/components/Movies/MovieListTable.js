import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import { FaEdit } from 'react-icons/fa';
import { FiDelete } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';
import { AiFillCheckCircle } from 'react-icons/ai';

import { capitalizeFirstLetter } from 'utilities/utils';

export default function MovieListTable({ movies = [], deleteMovie }) {
  return (
    <div className="overflow-x-auto relative border rounded">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6 w-[30%]">
              Movie Title
            </th>
            <th scope="col" className="py-3 px-6 w-[20%]">
              Release Date
            </th>
            <th scope="col" className="py-3 px-6 w-[10%]">
              Links
            </th>

            <th scope="col" className="py-3 px-6 w-[10%]">
              Poster
            </th>
            <th scope="col" className="py-3 px-6 w-[10%]">
              tmdb_id
            </th>
            <th scope="col" className="py-3 px-6 w-[10%]">
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
                  className="py-4 px-6 font-medium text-blue-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/admin/movie/edit/${movie._id}`}>
                    {capitalizeFirstLetter(movie.title)}
                  </Link>
                </th>
                <td className="py-4 px-6">
                  {new Date(movie.release_date).toDateString()}
                </td>
                <td className="py-4 px-6 ml-4">
                  {movie.link ? (
                    <p data-tip={`${movie.link}`}>
                      <a
                        href={`${movie.link}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-blue-900"
                      >
                        Link
                      </a>
                    </p>
                  ) : (
                    <GiCancel className="text-lg text-red-700" />
                  )}
                </td>
                <td className="py-4 px-6 ml-4">
                  <p data-tip={`${movie.poster}`}>
                    {movie.poster ? (
                      <AiFillCheckCircle className="text-lg text-green-800" />
                    ) : (
                      <GiCancel />
                    )}
                  </p>
                </td>
                <td className="py-4 px-6">{movie.tmdb_id}</td>
                <td className="py-4 px-6 flex gap-2">
                  <button
                    className="text-red-700"
                    type="button"
                    onClick={() => deleteMovie(movie._id, movie.title)}
                  >
                    <p data-tip="delete">
                      <FiDelete className="text-lg" />
                    </p>
                    <ReactTooltip />
                  </button>
                  <Link
                    to={`/admin/movie/edit/${movie._id}`}
                    className="text-blue-400"
                  >
                    <p data-tip="edit">
                      <FaEdit className="text-lg" />
                    </p>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
