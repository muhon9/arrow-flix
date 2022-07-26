import { useSelector } from "react-redux";
import { selectTmdbData } from "redux/tmdb/tmdbSelector";

const AddMovieForm = () => {
  const { loading, error, data: tmdbData } = useSelector(selectTmdbData);

  return <div>{JSON.stringify(tmdbData)}</div>;
};

export default AddMovieForm;
