import { motion } from "framer-motion";
import { FaChevronDown, FaMinus, FaPlay, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BASE_IMG_URL } from "../../requestUrls";
import { posterFadeInVariants } from "../../utilities/motionUtils";

const FeaturedPoster = (result = {}) => {
  //   const {
  //     item,
  //     item: {
  //       title,
  //       original_name,
  //       original_title,
  //       name,
  //       genre_ids,
  //       backdrop_path,
  //     },
  //     isFavourite = false,
  //   } = result;
  let fallbackTitle = "Money heist";
  let backdrop_path = true;
  let isFavourite = false;
  const genres = ["Action", "Triller"];

  const handleAdd = (event) => {
    event.stopPropagation();
  };
  const handleRemove = (event) => {
    event.stopPropagation();
  };

  const handleModalOpening = () => {};

  const handlePlayAction = (event) => {
    event.stopPropagation();
  };

  return (
    <motion.div
      variants={posterFadeInVariants}
      className="relative overflow-hidden inline-block whitespace-normal align-top py-0 px-[3px] mb-[4vw] w-1/2 md:w-1/3 lg:w-1/4 scale-100 cursor-pointer transition-transform duration-300 ease-out first:origin-left last:origin-right hover:scale-125 hover:z-30"
      onClick={handleModalOpening}
    >
      {backdrop_path ? (
        <img
          className="block h-full w-full rounded-md"
          src={`${BASE_IMG_URL}/ktDJ21QQscbMNQfPpZBsNORxdDx.jpg`}
          alt={fallbackTitle}
        />
      ) : (
        <>
          <img
            className="block h-full w-full rounded-md"
            src={`${BASE_IMG_URL}/ktDJ21QQscbMNQfPpZBsNORxdDx.jpg`}
            alt={fallbackTitle}
          />
          <div className="absolute top-0 left-0 flex justify-center items-center h-full w-full min-w-full min-h-[110px] rounded-md text-center font-medium z-[-1] py-0 px-[1em]">
            <span>{fallbackTitle}</span>
          </div>
        </>
      )}
      <div className="absolute left-[3px] bottom-0 flex flex-col items-start justify-end w-[calc(100%-6px)] h-full p-[0.6em] opacity-0 z-20 rounded-md pointer-events-none transition-all duration-300 ease-linear md:pointer-events-auto hover:opacity-100 translate-y-[15%] hover:translate-y-0">
        <div className="flex items-center justify-start">
          <Link
            className="inline-flex p-[6px] rounded-[50%] text-xs cursor-pointer my-0 mx-[5px] mb-[0.6em] bg-transparent  border-2 border-white transition-all duration-300 ease-out outline-none lg:text-md lg:mb-[0.8em] bg-white text-black hover:bg-slate-100"
            onClick={handlePlayAction}
            to={"/play"}
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
        <div className="pl-[6px] text-xs text-white font-bold lg:text-lg">
          <h3>Money Heist</h3>
        </div>
        <div className="pl-[6px] block text-white w-full">
          {genres &&
            genres.map((genre, index) => (
              <span
                key={index}
                className="inline-block w-auto text-[8px] my-0  lg:text-[10px] after:content-['●'] after:px-2 last:after:content-['']"
              >
                {genre}
              </span>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedPoster;
