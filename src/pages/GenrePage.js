import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Poster from "../components/Posters/Poster";
import useGenreMovies from "../hooks/useGenreMovies";
import { getActionMovies } from "../redux/movies/actionMoviesSlice";
import { staggerHalf } from "../utilities/motionUtils";
import { capitalizeFirstLetter } from "../utilities/utils";

export default function GenrePage({ match }) {
  const params = useParams();
  const { categoryName } = params;
  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(1);

  const { loading, error, data } = useGenreMovies(page);
  console.log("Hello world", data);

  useEffect(() => {
    console.log(location);
    window.scroll(0, 0);
    dispatch(getActionMovies());
  }, [dispatch, location]);

  function fetchMore() {
    setPage((prevPage) => prevPage + 1);
    console.log("Function triggered");
  }

  return (
    <div className="text-white px-[4vw] mx-auto pt-[10vh] w-full">
      <div className="text-4xl font-extrabold w-full text-center py-8">
        {capitalizeFirstLetter(categoryName)} Movies
      </div>

      <InfiniteScroll
        dataLength={data?.length} //This is important field to render the next data
        next={fetchMore}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        className="w-full flex flex-row flex-wrap mx-auto"
        variants={staggerHalf}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {data &&
          data.map((movie, i) => (
            <div className="w-[33.3%] md:max-w-[16.6%] mb-4" key={i}>
              <Poster result={movie} />
            </div>
          ))}
      </InfiniteScroll>
      <motion.div
        className="w-full flex flex-row flex-wrap mx-auto"
        variants={staggerHalf}
        initial="initial"
        animate="animate"
        exit="exit"
      ></motion.div>
    </div>
  );
}
