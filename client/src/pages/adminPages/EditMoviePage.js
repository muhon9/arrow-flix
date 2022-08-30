import movieApi from 'api/movieApi';
import AddMovieForm from 'components/Forms/Movie/AddMovieForm';
import EditMovieForm from 'components/Forms/Movie/EditMovieForm';
import GenerateDataForm from 'components/Forms/Movie/GenerateDataForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AddMoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function getMovieData(movieId) {
      const res = await movieApi.getMovie(movieId);
      console.log(res.data);
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
