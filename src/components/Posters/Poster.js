import { motion } from "framer-motion";
import { FaChevronDown, FaMinus, FaPlay, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BASE_IMG_URL } from "../../requestUrls";
import { posterFadeInVariants } from "../../utilities/motionUtils";

const Poster = (result = {}) => {
  let backdrop_path = true;
  let fallbackTitle = "ehllo";
  let isFavourite = false;
  return (
    <motion.div
      variants={posterFadeInVariants}
      className="group w-full relative overflow-hidden inline-block whitespace-normal algin-top py-0 px-[3px]"
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
          <div className="absolute top-0 left-0 flex justify-center items-center h-full w-full min-w-full min-h-[110px] rounded-md text-center font-medium py-0 px-[1em]">
            <span>{fallbackTitle}</span>
          </div>
        </>
      )}
      <div className="absolute left-[3px] bottom-0 flex flex-col items-start justify-end w-[calc(100%-6px)] h-full p-[0.6em]  rounded-md pointer-events-none transition-all duration-300 ease-linear md:pointer-events-auto">
        <div className="flex items-center justify-start opacity-0 translate-y-[15%] transition-all duration-300 ease-in group-hover:opacity-100 group-hover:translate-y-0">
          <Link
            className="inline-flex p-[6px] rounded-[50%] text-xs cursor-pointer my-0 mx-[5px] mb-[0.6em] bg-transparent  border-2 border-white transition-all duration-300 ease-out outline-none lg:text-md lg:mb-[0.8em] bg-white text-black hover:bg-slate-100"
            to={"/play"}
          >
            <FaPlay className="" />
          </Link>
          {!isFavourite ? (
            <button className="inline-flex p-[6px] rounded-[50%] text-xs cursor-pointer my-0 mx-[5px] mb-[0.6em] bg-transparent text-white border-2 border-white transition-all duration-300 ease-out outline-none lg:text-md lg:mb-[0.8em] hover:bg-white hover:text-black icon--play icon--favourite">
              <FaPlus />
            </button>
          ) : (
            <button className="inline-flex p-[6px] rounded-[50%] text-xs cursor-pointer my-0 mx-[5px] mb-[0.6em] bg-transparent text-white border-2 border-white transition-all duration-300 ease-out outline-none lg:text-md lg:mb-[0.8em] hover:bg-white hover:text-black icon--play icon--favourite">
              <FaMinus />
            </button>
          )}
          <button className="inline-flex p-[6px] rounded-[50%] text-xs cursor-pointer my-0 mx-[5px] mb-[0.6em] bg-transparent text-white border-2 border-white transition-all duration-300 ease-out outline-none lg:text-md lg:mb-[0.8em] hover:bg-white hover:text-black icon--play icon--toggleModal">
            <FaChevronDown />
          </button>
        </div>
        <div className="pl-[6px] opacity-100 text-xs text-white font-bold lg:text-lg">
          <h3>Money Heist</h3>
        </div>
        <div className="pl-[6px] block text-white w-full">Action</div>
        <div className="absolute bottom-0 right-0 text-white bg-gray-600 text-sm  px-2">
          Movie
        </div>
      </div>
    </motion.div>
  );
};

export default Poster;
