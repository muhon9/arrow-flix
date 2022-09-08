import axios from 'axios';
import { useEffect, useState } from 'react';
import requestUrls from '../requestUrls';

const useGenreMovies = (page) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${requestUrls.fetchActionMovies}&page=${page}`)
      .then((res) => {
        setLoading(false);
        setData((prevData) => [...prevData, ...res.data.results]);
        if (page === res.data.totalPages) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [page]);

  return { loading, error, data };
};

export default useGenreMovies;
