import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setGenreMovies } from "../redux/movies/genreMoviesSlice";
import requestUrls from "../requestUrls";

const useGenreMovies = (page) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("page", page);
    axios.get(`${requestUrls.fetchActionMovies}&page=${page}`).then((res) => {
      setData((prevData) => [...prevData, ...res.data.results]);
      dispatch(setGenreMovies([...data, ...res.data.results]));
    });
    return () => {
      dispatch(setGenreMovies([]));
    };
  }, [page]);

  return { loading, error, data };
};

export default useGenreMovies;
