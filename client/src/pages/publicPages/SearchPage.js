import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { selectSearchResult } from 'redux/search/searchSelector';
import Poster from 'components/Posters/Poster';
import { motion } from 'framer-motion';
import { staggerHalf } from 'utilities/motionUtils';

const SearchPage = () => {
  const { loading, error, searchResult } = useSelector(selectSearchResult);

  const [searchParams] = useSearchParams();

  return (
    <div className="min-h-screen pt-32 mx-[4vw] text-white">
      <div className="text-xl font-bold">
        Search result for : {searchParams.get('q')}
      </div>
      {error && !loading && <div>There was an error occured</div>}
      {searchResult && searchResult.length < 1 && (
        <div className="mt-16">No mache found for {searchParams.get('q')}</div>
      )}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-5 mt-6"
        variants={staggerHalf}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {searchResult &&
          searchResult.map((result) => (
            <div key={result._id} className="my-1">
              <Poster result={result} />
            </div>
          ))}
      </motion.div>
    </div>
  );
};

export default SearchPage;
