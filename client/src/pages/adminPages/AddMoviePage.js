import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTmdbData } from "../../redux/tmdb/tmdbSelector";
import { getTmdbData } from "../../redux/tmdb/tmdbSlice";

const AddMoviePage = () => {
  const dispatch = useDispatch();
  const [tmdbId, setTmdbId] = useState("");
  const { loading, error, data: tmdbData } = useSelector(selectTmdbData);

  function getData(e) {
    e.preventDefault();
    dispatch(getTmdbData(tmdbId));
  }

  return (
    <div className="text-white">
      {loading && <div>Loading.....</div>}
      {JSON.stringify(tmdbData)}
      {error && <div className="text-red-800">error</div>}
      <form onSubmit={getData}>
        <label htmlFor="name">Id: </label>
        <input
          className="bg-gray-700"
          value={tmdbId}
          type="text"
          id="id"
          onChange={(event) => setTmdbId(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default AddMoviePage;
