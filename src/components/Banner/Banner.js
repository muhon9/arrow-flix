import { motion } from "framer-motion";
import React from "react";
import { BiInfoCircle } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  bannerFadeInLoadSectionVariants,
  bannerFadeInUpVariants,
  bannerFadeInVariants,
  staggerOne,
} from "../../utilities/motionUtils";

import { BASE_IMG_URL } from "../../requestUrls";
// import SkeletonBanner from "../SkeletonBanner/SkeletonBanner";

const Banner = ({ type }) => {
  //   let selector;
  //   switch (type) {
  //     case "movies":
  //       selector = selectTrendingMovies;
  //       break;
  //     case "series":
  //       selector = selectNetflixSeries;
  //       break;
  //     default:
  //       selector = selectNetflixMovies;
  //       break;
  //   }

  //   const myData = useSelector(selector);
  //   const { loading, error, data: results } = myData;
  //   const finalData = results[randomize(results)];
  //   const fallbackTitle =
  //     finalData?.title || finalData?.name || finalData?.original_name;
  //   const description = truncate(finalData?.overview, 150);
  //   const dispatch = useDispatch();

  const handlePlayAnimation = (event) => {
    event.stopPropagation();
  };

  const handleModalOpening = () => {
    // dispatch(showModalDetail({ ...finalData, fallbackTitle }));
  };

  return (
    <>
      <motion.section
        variants={bannerFadeInLoadSectionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="Banner__loadsection"
      >
        {/* {loading && <SkeletonBanner />}
        {error && <div className="errored">Oops, an error occurred.</div>} */}
      </motion.section>

      <motion.header
        variants={bannerFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative flex items-end lg:items-center bg-black bg-top bg-no-repeat bg-cover h-[90vh] lg:h-[80vh] text-white"
        style={{
          backgroundImage: `url(${BASE_IMG_URL}/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg`,
        }}
      >
        <motion.div
          className="w-full flex flex-col items-center text-center py-0 px-[4vw] pb-[10vh] z-10 lg:items-start lg:pb-none lg:text-left"
          variants={staggerOne}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.h1
            variants={bannerFadeInUpVariants}
            className="text-4xl font-bold sm:text-5xl md:text-6xl leading-none drop-shadow-lg lg:max-w-[40vw]"
          >
            Money Heist
          </motion.h1>
          <motion.div
            variants={bannerFadeInUpVariants}
            className="flex items-start ml-0 mt-[1vw]"
          >
            <Link
              className="inline-flex justify-center items-center min-w-[140px] bg-red-600 text-white py-[10px] px-[16px] border-0 rounded-md mt-[1em] text-base font-medium cursor-pointer no-underline transition-all duration-200 ease-out hover:bg-red-800"
              onClick={handlePlayAnimation}
              to={"/play"}
            >
              <FaPlay />
              <span className="ml-2">Play</span>
            </Link>
            <button
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
            Are you happy? With this question, Zoa and four other attractive
            young people, very active on social networks, are invited to the
            most exclusive part..
          </motion.p>
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-black/[.02] " />
        <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#141414] to-transparent" />
      </motion.header>
    </>
  );
};

export default React.memo(Banner);
