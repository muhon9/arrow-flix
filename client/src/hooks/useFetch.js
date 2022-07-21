import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get(url);
      } catch (error) {}
    }
  }, []);
};
