import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import ArrowPlayer from 'components/Player/ArrowPlayer';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import movieApi from 'api/movieApi';
import { data } from 'autoprefixer';

const PlayerPage = () => {
  const [params] = useSearchParams();
  const movieId = params.get('id');
  const [movieData, setMovieData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    movieApi
      .getMovie(movieId)
      .then((res) => {
        setMovieData(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, [movieId]);

  return (
    <ArrowPlayer
      src={movieData?.link}
      title={movieData?.title}
      track="videos/subtitles.vtt"
      autoPlay
      muted
    />
  );
};

export default PlayerPage;
