import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Poster from "../components/Posters/Poster";
import { getActionMovies } from "../redux/movies/actionMoviesSlice";
import { selectActionMovies } from "../redux/movies/moviesSelector";
import { capitalizeFirstLetter } from "../utilities/utils";

export default function GenrePage({ genre }) {
  const { categoryName } = useParams();
  const { loading, error, data: results } = useSelector(selectActionMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActionMovies());
  }, [dispatch]);
  return (
    <div className="text-white px-[4vw] mx-auto pt-[10vh] w-full">
      <div className="text-4xl font-extrabold w-full text-center py-8">
        {capitalizeFirstLetter(categoryName)} Movies
      </div>
      <div className="w-full flex flex-row flex-wrap mx-auto">
        {results &&
          results.map((movie) => (
            <div className="w-[33.3%] md:max-w-[16.6%] mb-4">
              <Poster result={movie} />
            </div>
          ))}
      </div>
    </div>
  );
}
