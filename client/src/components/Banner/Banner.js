import { motion } from 'framer-motion';
import React from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import { FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SkeletonBanner from 'components/Skelitons/SkeletonBanner';
import { useGetFeaturedMoviesQuery } from 'redux/api/rootApi';
import {
  bannerFadeInLoadSectionVariants,
  bannerFadeInUpVariants,
  bannerFadeInVariants,
  staggerOne,
} from '../../utilities/motionUtils';

import { showModal } from '../../redux/modal/modalSlice';
import { BASE_IMG_URL } from '../../requestUrls';
import {
  capitalizeEveryFirstLetter,
  randomize,
  truncate,
} from '../../utilities/utils';

const Banner = ({ type }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, data = {} } = useGetFeaturedMoviesQuery();
  const { results = {} } = data;

  const bannerMovie = results[randomize(results)];

  const fallbackTitle =
    bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name;
  const description = truncate(bannerMovie?.overview, 150);

  const backdropPath = bannerMovie?.backdrop_path
    ? `${BASE_IMG_URL}/${bannerMovie.backdrop_path}`
    : `https://images.pexels.com/photos/185933/pexels-photo-185933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`;

  const handlePlayAnimation = (event) => {
    event.stopPropagation();
  };

  const handleModalOpening = () => {
    dispatch(showModal(bannerMovie));
  };

  return (
    <>
      <motion.section
        variants={bannerFadeInLoadSectionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {isLoading && <SkeletonBanner />}
        {isError && <div>An error has happend</div>}
      </motion.section>
      {!isLoading && !isError && (
        <motion.header
          variants={bannerFadeInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative flex items-end lg:items-center bg-black bg-top bg-no-repeat bg-cover h-[90vh] lg:h-[80vh] text-white"
          style={{
            backgroundImage: `url(${backdropPath})`,
          }}
        >
          <motion.div
            className="w-full flex flex-col items-center text-center md:mt-16 py-0 px-[4vw] pb-[10vh] z-10 lg:items-start lg:pb-none lg:text-left"
            variants={staggerOne}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.h1
              variants={bannerFadeInUpVariants}
              className="text-4xl font-bold sm:text-5xl md:text-6xl leading-none drop-shadow-lg lg:max-w-[40vw]"
            >
              {capitalizeEveryFirstLetter(fallbackTitle)}
            </motion.h1>
            <motion.div
              variants={bannerFadeInUpVariants}
              className="flex items-start ml-0 mt-[1vw]"
            >
              <Link
                className="inline-flex justify-center items-center min-w-[140px] bg-red-600 text-white py-[10px] px-[16px] border-0 rounded-md mt-[1em] text-base font-medium cursor-pointer no-underline transition-all duration-200 ease-out hover:bg-red-800"
                onClick={handlePlayAnimation}
                to="/play"
              >
                <FaPlay />
                <span className="ml-2">Play</span>
              </Link>
              <button
                type="button"
                className="inline-flex justify-center min-w-[140px] bg-slate-800 text-white py-[10px] px-[16px] ml-[10px] border-0 rounded-md mt-[1em] text-base font-medium cursor-pointer no-underline transition-all duration-200 ease-out hover:bg-slate-700"
                onClick={handleModalOpening}
              >
                <BiInfoCircle size="1.5em" />
                <span className="ml-2">More info</span>
              </button>
            </motion.div>
            <motion.p
              variants={bannerFadeInUpVariants}
              className="text-sm leading-3 drop-shadow-lg text-white mt-4 sm:text-base md:max-w-[60vw] lg:max-w-[30vw] lg:mt-[1vw]"
            >
              {description}
            </motion.p>
          </motion.div>
          <div className="absolute top-0 left-0 w-full h-[25vh] z-0 bg-gradient-to-b from-[#141414] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#141414] to-transparent" />
        </motion.header>
      )}
    </>
  );
};

export default React.memo(Banner);
