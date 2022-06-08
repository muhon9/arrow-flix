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
        className="Banner"
        style={{
          backgroundImage: `url(${BASE_IMG_URL}/1zgz0LAT3avelWe6whHSa9j7zfq.jpg`,
        }}
      >
        <motion.div
          className="Banner__content"
          variants={staggerOne}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.h1
            variants={bannerFadeInUpVariants}
            className="Banner__content--title"
          >
            fallbackTitle
          </motion.h1>
          <motion.div
            variants={bannerFadeInUpVariants}
            className="Banner__buttons"
          >
            <Link
              className="Banner__button"
              onClick={handlePlayAnimation}
              to={"/play"}
            >
              <FaPlay />
              <span>Play</span>
            </Link>
            <button className="Banner__button" onClick={handleModalOpening}>
              <BiInfoCircle size="1.5em" />
              <span>More info</span>
            </button>
          </motion.div>
          <motion.p
            variants={bannerFadeInUpVariants}
            className="Banner__content--description"
          >
            Movie Description
          </motion.p>
        </motion.div>
        <div className="Banner__panel" />
        <div className="Banner__bottom-shadow" />
      </motion.header>
    </>
  );
};

export default React.memo(Banner);
