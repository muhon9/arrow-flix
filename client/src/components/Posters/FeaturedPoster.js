import { motion } from 'framer-motion';
import useGenreConversion from 'hooks/useIdtoGenre';
import { FaChevronDown, FaMinus, FaPlay, FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { capitalizeEveryFirstLetter } from 'utilities/utils';
import { showModal } from '../../redux/modal/modalSlice';
import { BASE_IMG_URL } from '../../requestUrls';
import { posterFadeInVariants } from '../../utilities/motionUtils';

const FeaturedPoster = ({ result }) => {
  const {
    title,
    original_name,
    original_title,
    name,
    media_type,
    backdrop_path,
    original_language,
    geners,
  } = result;

  const fallbackTitle = title || original_title || name || original_name;

  const dispatch = useDispatch();

  const isFavourite = false;

  const handleAdd = (event) => {
    event.stopPropagation();
  };
  const handleRemove = (event) => {
    event.stopPropagation();
  };

  const handleModalOpening = () => {
    dispatch(showModal(result));
  };

  const handlePlayAction = (event) => {
    event.stopPropagation();
  };

  return (
    <motion.div
      variants={posterFadeInVariants}
      className="h-full group relative overflow-hidden inline-block whitespace-normal algin-top py-0 px-[3px] w-full scale-100 cursor-pointer transition-transform duration-300 ease-out origin-center"
      onClick={handleModalOpening}
    >
      {backdrop_path ? (
        <img
          className="block h-full w-full rounded-md"
          src={`${BASE_IMG_URL}/${backdrop_path}`}
          alt={fallbackTitle}
        />
      ) : (
        <>
          <img
            className="block h-full w-full rounded-md"
            src={`${BASE_IMG_URL}/ktDJ21QQscbMNQfPpZBsNORxdDx.jpg`}
            alt={fallbackTitle}
          />
          <div className="absolute top-0 left-0 flex justify-center items-center h-full w-full min-w-full min-h-[110px] rounded-md text-center font-medium py-0 px-[1em]">
            <span>{fallbackTitle}</span>
          </div>
        </>
      )}
      <div className="absolute left-[3px] bottom-0 flex flex-col items-start justify-end w-[calc(100%-6px)] h-full p-[0.6em]  rounded-md pointer-events-none transition-all duration-300 ease-linear md:pointer-events-auto">
        <div className="flex items-center justify-start opacity-0 translate-y-[15%] transition-all duration-300 ease-in group-hover:opacity-100 group-hover:translate-y-0">
          <Link
            className="inline-flex p-[6px] rounded-[50%] text-xs cursor-pointer my-0 mx-[5px] mb-[0.6em] bg-transparent  border-2 border-white transition-all duration-300 ease-out outline-none lg:text-md lg:mb-[0.8em] bg-white text-white hover:bg-slate-100"
            onClick={handlePlayAction}
            to={'/play'}
          >
            <FaPlay className="" />
          </Link>
          {!isFavourite ? (
            <button
              className="inline-flex p-[6px] rounded-[50%] text-xs cursor-pointer my-0 mx-[5px] mb-[0.6em] bg-transparent text-white border-2 border-white transition-all duration-300 ease-out outline-none lg:text-md lg:mb-[0.8em] hover:bg-white hover:text-black icon--play icon--favourite"
              onClick={handleAdd}
            >
              <FaPlus />
            </button>
          ) : (
            <button
              className="inline-flex p-[6px] rounded-[50%] text-xs cursor-pointer my-0 mx-[5px] mb-[0.6em] bg-transparent text-white border-2 border-white transition-all duration-300 ease-out outline-none lg:text-md lg:mb-[0.8em] hover:bg-white hover:text-black icon--play icon--favourite"
              onClick={handleRemove}
            >
              <FaMinus />
            </button>
          )}
          <button className="inline-flex p-[6px] rounded-[50%] text-xs cursor-pointer my-0 mx-[5px] mb-[0.6em] bg-transparent text-white border-2 border-white transition-all duration-300 ease-out outline-none lg:text-md lg:mb-[0.8em] hover:bg-white hover:text-black icon--play icon--toggleModal">
            <FaChevronDown onClick={handleModalOpening} />
          </button>
        </div>
        <div className="pl-[6px] opacity-100 text-xs text-white drop-shadow-lg shadow-black font-bold lg:text-lg lg:font-bold">
          <h3>{capitalizeEveryFirstLetter(fallbackTitle)}</h3>
        </div>
        <div className="pl-[6px] block text-white w-full">
          {geners &&
            geners.map((genre, index) => (
              <span
                key={index}
                className="inline-block w-auto text-[8px] my-0  lg:text-[10px] after:content-['●'] after:px-2 last:after:content-['']"
              >
                {genre}
              </span>
            ))}
        </div>
        <div className="absolute bottom-0 right-0 text-white bg-gray-600 text-sm  px-2">
          {media_type}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedPoster;
