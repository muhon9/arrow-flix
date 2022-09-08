import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        // blank
      }
    }
    fetchData();
  }, []);

  return { loading, error, data };
};

export default useFetch;
