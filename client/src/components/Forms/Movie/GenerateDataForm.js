import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTmdbData } from 'redux/tmdb/tmdbSelector';
import { fetchTmdbData } from 'redux/tmdb/tmdbSlice';

export default function GenerateDataForm() {
  const dispatch = useDispatch();
  const [tmdbId, setTmdbId] = useState('');
  const { loading, error } = useSelector(selectTmdbData);
  // const loading = false;
  // const error = null;

  function getData(e) {
    e.preventDefault();
    dispatch(fetchTmdbData(tmdbId));
  }

  return (
    <div className="border-2 border-slate-400 py-2 px-4">
      <form onSubmit={getData} className="">
        <label htmlFor="id">TMDb ID: </label>
        <input
          className="bg-white p-1 rounded border-2 border-slate-600 mr-2"
          value={tmdbId}
          type="text"
          id="id"
          onChange={(event) => setTmdbId(event.target.value)}
        />
        <button
          type="submit"
          className="bg-red-500 w-[150px] hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
        >
          {loading ? 'Loading.......' : 'Generate Data'}
        </button>
      </form>
      <div className="text-sm py-2">
        You can generate data from tmdb. Put the tmdb ID here and all the form
        data will be filled automatically. https://www.themoviedb.org/movie/
        <span className="bg-red-300">663712</span>-terrifier-2
      </div>
      {error && <div className="text-red-800">{error}</div>}
    </div>
  );
}
