import Poster from 'components/Posters/Poster';
import { motion } from 'framer-motion';
import useGenreMovies from 'hooks/useGenreMovies';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { staggerHalf } from 'utilities/motionUtils';
import { capitalizeFirstLetter } from 'utilities/utils';

export default function GenreWisePage({ match }) {
  const params = useParams();
  const { categoryName } = params;
  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const { loading, error, data } = useGenreMovies(page);

  useEffect(() => {
    window.scroll(0, 0);
  }, [dispatch, location]);

  function fetchMore() {
    setPage((prevPage) => prevPage + 1);
    console.log('Function triggered');
  }

  return (
    <div className="text-white px-[4vw] mx-auto pt-[10vh] w-full">
      <div className="text-4xl font-extrabold w-full text-center py-8">
        {capitalizeFirstLetter(categoryName)}
        Movies
      </div>
      {error && <div>Opps, There is an error</div>}
      <motion.div
        variants={staggerHalf}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <InfiniteScroll
          dataLength={data?.length} // This is important field to render the next data
          next={fetchMore}
          hasMore={true}
          loader={<h3>Loading</h3>}
          className="w-full flex flex-row flex-wrap mx-auto"
        >
          {data &&
            data.map((movie, i) => (
              <div className="w-[33.3%] md:max-w-[16.6%] mb-4" key={i}>
                <Poster result={movie} />
              </div>
            ))}
        </InfiniteScroll>
      </motion.div>
    </div>
  );
}
