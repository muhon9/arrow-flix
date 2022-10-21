import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import movieApi from 'api/movieApi';

import EditMovieForm from 'components/Forms/Movie/EditMovieForm';

function AddMoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function getMovieData(movieId) {
      const res = await movieApi.getMovie(movieId);
      setMovie(res.data);
    }
    getMovieData(id);
  }, []);

  return (
    <div className="">
      Edit movie
      <EditMovieForm id={id} movieData={movie} />
    </div>
  );
}

export default AddMoviePage;
