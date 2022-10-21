import { motion } from 'framer-motion';
import { FaChevronDown, FaMinus, FaPlay, FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { capitalizeEveryFirstLetter } from 'utilities/utils';
import { showModal } from 'redux/modal/modalSlice';

import { BASE_IMG_URL } from '../../requestUrls';
import { posterFadeInVariants } from '../../utilities/motionUtils';

const Poster = ({ result }) => {
  const {
    title,
    original_name,
    original_title,
    name,
    geners,
    poster_path,
    poster,
  } = result;

  const fallbackTitle = title || original_title || name || original_name;

  const isFavourite = false;

  const dispatch = useDispatch();
  const handleModalOpening = () => {
    dispatch(showModal(result));
  };

  const handlePlayAction = (event) => {
    event.stopPropagation();
  };

  return (
    <motion.div
      variants={posterFadeInVariants}
      className="group w-full cursor-pointer  relative overflow-hidden inline-block whitespace-normal algin-top py-0 px-[3px] "
      onClick={handleModalOpening}
    >
      {poster_path || poster ? (
        <img
          className="block h-full w-full rounded-md group-hover:opacity-10 group-hover:pointer-events-none"
          src={`${BASE_IMG_URL}/${poster_path || poster}`}
          alt={fallbackTitle}
        />
      ) : (
        <>
          <img
            className="block h-full w-full rounded-sm"
            src={`${BASE_IMG_URL}/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg`}
            alt={fallbackTitle}
          />
          <div className="absolute top-0 left-0 flex justify-center items-center h-full w-full min-w-full min-h-[110px] rounded-md text-center font-medium py-0 px-[1em]">
            <span>{fallbackTitle}</span>
          </div>
        </>
      )}
      <div className="poster-details z-10 absolute left-[3px] bottom-5 flex flex-col items-start justify-end w-[calc(100%-6px)] h-full p-[0.6em]  rounded-md pointer-events-auto opacity-0 translate-y-[15%] transition-all duration-300 ease-in group-hover:opacity-100 group-hover:translate-y-0">
        <div className="action-buttons flex items-center justify-start opacity-0 translate-y-[15%] transition-all duration-300 ease-in group-hover:opacity-100 group-hover:translate-y-0">
          <Link
            className="play-button inline-flex p-[6px] rounded-[50%] text-xs cursor-pointer my-0 mx-[5px] mb-[0.6em] bg-transparent  border-2 border-white transition-all duration-300 ease-out outline-none lg:text-md lg:mb-[0.8em] bg-white text-white hover:bg-slate-100"
            onClick={handlePlayAction}
            to="/play"
          >
            <FaPlay />
          </Link>
          {!isFavourite ? (
            <button className="addfvrt-button inline-flex p-[6px] rounded-[50%] text-xs cursor-pointer my-0 mx-[5px] mb-[0.6em] bg-transparent text-white border-2 border-white transition-all duration-300 ease-out outline-none lg:text-md lg:mb-[0.8em] hover:bg-white hover:text-black icon--play icon--favourite">
              <FaPlus />
            </button>
          ) : (
            <button className="inline-flex p-[6px] rounded-[50%] text-xs cursor-pointer my-0 mx-[5px] mb-[0.6em] bg-transparent text-white border-2 border-white transition-all duration-300 ease-out outline-none lg:text-md lg:mb-[0.8em] hover:bg-white hover:text-black icon--play icon--favourite">
              <FaMinus />
            </button>
          )}
          <button className="details-button inline-flex p-[6px] rounded-[50%] text-xs cursor-pointer my-0 mx-[5px] mb-[0.6em] bg-transparent text-white border-2 border-white transition-all duration-300 ease-out outline-none lg:text-md lg:mb-[0.8em] hover:bg-white hover:text-black icon--play icon--toggleModal">
            <FaChevronDown />
          </button>
        </div>
        <div className="pl-[6px]  text-xs text-white font-bold lg:text-lg lg:font-medium">
          <h3>{capitalizeEveryFirstLetter(fallbackTitle)}</h3>
        </div>
        <div className="pl-[6px] block text-white w-full">
          {geners &&
            geners.map((gener, index) => (
              <span
                key={index}
                className="inline-block w-auto text-[8px] my-0 lg:text-[10px] after:content-['●'] after:px-2 last:after:content-['']"
              >
                {gener}
              </span>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Poster;
