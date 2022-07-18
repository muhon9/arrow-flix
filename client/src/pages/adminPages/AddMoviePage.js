import axios from "axios";
import React from "react";
const AddMoviePage = () => {
  const [movie, setMovie] = React.useState({});
  const [id, setId] = React.useState("");
  const [error, setError] = React.useState("");

  // React.useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/movie/20453?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  //     )
  //     .then((res) => {
  //       setMovie(res.data);
  //     });
  // }, []);

  function getData(e) {
    console.log(e.target);
    e.preventDefault();
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      .then((res) => {
        setId("");
        setMovie(res.data);
        setError("");
      })
      .catch((err) => {
        setError("Error");
        setMovie({});
        setId("");
      });
  }

  return (
    <div className="text-white">
      {JSON.stringify(movie)}
      {error && <div className="text-red-800">error</div>}
      <form onSubmit={getData}>
        <label htmlFor="name">Id: </label>
        <input
          className="bg-gray-700"
          value={id}
          type="text"
          id="id"
          onChange={(event) => setId(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default AddMoviePage;
