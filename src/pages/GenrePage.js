import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Poster from "../components/Posters/Poster";
import { getActionMovies } from "../redux/movies/actionMoviesSlice";
import { selectActionMovies } from "../redux/movies/moviesSelector";
import { staggerHalf } from "../utilities/motionUtils";
import { capitalizeFirstLetter } from "../utilities/utils";
export default function GenrePage({ match }) {
  const params = useParams();
  const { categoryName } = params;
  const { loading, error, data: results } = useSelector(selectActionMovies);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    window.scroll(0, 0);
    dispatch(getActionMovies());
  }, [dispatch, location]);

  return (
    <div className="text-white px-[4vw] mx-auto pt-[10vh] w-full">
      <div className="text-4xl font-extrabold w-full text-center py-8">
        {capitalizeFirstLetter(categoryName)} Movies
      </div>

      <motion.div
        className="w-full flex flex-row flex-wrap mx-auto"
        variants={staggerHalf}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {results &&
          results.map((movie, i) => (
            <div className="w-[33.3%] md:max-w-[16.6%] mb-4" key={i}>
              <Poster result={movie} />
            </div>
          ))}
      </motion.div>
    </div>
  );
}
