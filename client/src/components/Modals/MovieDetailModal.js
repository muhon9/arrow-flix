import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { FaDownload, FaPlay } from 'react-icons/fa';
import { VscChromeClose } from 'react-icons/vsc';

import { capitalizeEveryFirstLetter } from 'utilities/utils';

import { selectModalData, selectModalStatus } from 'redux/modal/modalSelectors';
import { hideModal } from 'redux/modal/modalSlice';

import {
  modalFadeInUpVariants,
  modalOverlayVariants,
  modalVariants,
  staggerOne,
} from 'utilities/motionUtils';
import { BASE_IMG_URL, FALLBACK_IMG_URL } from '../../requestUrls';

const MovieDetailModal = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const modalStatus = useSelector(selectModalStatus);
  const modalData = useSelector(selectModalData);
  const fallbackTitle =
    modalData?.title || modalData?.name || modalData?.original_name;
  const description = modalData?.overview;
  const backdrop_path = modalData?.backdrop_path;
  const { adult, original_language, release_date, vote_average } =
    modalData || {};

  // turn of scrolling of the body in background when the modal is open
  useEffect(() => {
    if (modalStatus) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalStatus]);

  const handleModalClose = () => {
    dispatch(hideModal());
  };
  const handlePlayAnimation = (event) => {
    event.stopPropagation();
    handleModalClose();
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {modalStatus && (
        <motion.div
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          key="modalOverlay"
          className={`modal-wrapper fixed left-0 right-0 bottom-0 top-0 w-screen h-screen bg-black/[0.6] opacity-100 pointer-events-auto z-[100] ${
            !modalStatus && 'opacity-0 -z-10 pointer-events-none'
          }`}
        >
          <motion.div
            key="modal"
            variants={modalVariants}
            ref={modalRef}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[80vw] md:w-[65vw] lg:w-[55vw] xl:max-w-3xl h-[calc(100vh-100px)] overflow-y-auto max-w-full max-h-full z-[101] pointer-events-auto bg-lightBlack rounded-[5px] ${
              !modalStatus && '-z-index-10 pointer-events-none'
            }`}
          >
            <motion.button
              className="absolute top-[2%] right-[2%] z-10 inline-flex p-2 text-base rounded-full cursor-pointer my-0 mx-1 mb-[0.8em] bg-black text-white border border-solid border-white transition-all duration-300 ease-out outline-none hover:bg-white hover:text-lightBlack"
              onClick={handleModalClose}
            >
              <VscChromeClose />
            </motion.button>
            <div className="relative">
              <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-lightBlack via-lightBlack to-transparent" />
              <img
                className="w-full"
                src={
                  backdrop_path
                    ? `${BASE_IMG_URL}/${backdrop_path}`
                    : `${FALLBACK_IMG_URL}`
                }
                alt="Hello"
              />
              <div className="absolute bottom-[10%] left-[1.5em] sm:left-[2em] flex items-center">
                <Link
                  className="inline-flex justify-center items-center min-w-[120px] bg-red-700 text-white py-3 px-4 ml-0 rounded-md border-0 text-sm font-medium cursor-pointer no-underline transition-all duration-200 ease-out hover:bg-red-900"
                  onClick={handlePlayAnimation}
                  to={`/play?id=${modalData?._id}`}
                >
                  <FaPlay />
                  <span className="ml-2">Play</span>
                </Link>
                <a
                  href="http://cdn.arrownetsylhet.com/Movies/English%20Movies%20All/2022/The.Man.from.Toronto.2022.1080p.WEBRip.mp4"
                  download={fallbackTitle}
                  className="inline-flex justify-center items-center min-w-[140px] bg-slate-800 text-white py-[10px] px-[16px] ml-[10px] border-0 rounded-md text-base font-medium cursor-pointer no-underline transition-all duration-200 ease-out hover:bg-slate-700"
                  onClick={handlePlayAnimation}
                >
                  <FaDownload />
                  <span className="ml-2">Download</span>
                </a>
              </div>
            </div>
            <motion.div
              variants={staggerOne}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-[1em] px-[2em] sm:py-[1em] sm:px-[2em] text-white"
            >
              <motion.h3
                variants={modalFadeInUpVariants}
                className="text-xl leading-6 font-semibold mb-4 sm:text-2xl"
              >
                {capitalizeEveryFirstLetter(fallbackTitle)}
              </motion.h3>
              <motion.p
                variants={modalFadeInUpVariants}
                className="text-base leading-7 sm:text-base sm:leading-[1.5]"
              >
                {description}
              </motion.p>
              <motion.hr
                variants={modalFadeInUpVariants}
                className="border border-gray-600 my-[1em] mx-0"
              />
              <motion.h4
                variants={modalFadeInUpVariants}
                className="text-base leading-6 font-normal mb-[15px]"
              >
                Info on <b>{capitalizeEveryFirstLetter(fallbackTitle)}</b>
              </motion.h4>
              <motion.div
                variants={modalFadeInUpVariants}
                className="text-base leading-7 m-[.5em] ml-0 break-words"
              >
                <span className="text-gray-500">Genres: </span>
                <span className="text-[#ddd] sm:text-sm leading-7">
                  {modalData?.geners.join(', ')}
                </span>
              </motion.div>
              <motion.div
                variants={modalFadeInUpVariants}
                className="text-base leading-7 m-[.5em] ml-0 break-words"
              >
                <span className="text-gray-500">Release Date: </span>
                <span className="text-[#ddd] sm:text-sm leading-7">
                  {release_date.substring(0, 10)}
                </span>
              </motion.div>
              <motion.div
                variants={modalFadeInUpVariants}
                className="text-base leading-7 m-[.5em] ml-0 break-words"
              >
                <span className="text-gray-500">Average vote: </span>
                <span className="text-[#ddd] sm:text-sm leading-7">
                  {vote_average}
                </span>
              </motion.div>
              <motion.div
                variants={modalFadeInUpVariants}
                className="text-[#ddd] sm:text-sm leading-7"
              >
                <span className="text-gray-500">Original language: </span>
                <span className="text-[#ddd] sm:text-sm leading-7">
                  {original_language}
                </span>
              </motion.div>
              <motion.div
                variants={modalFadeInUpVariants}
                className="text-base leading-7 m-[.5em] ml-0 break-words"
              >
                <span className="text-gray-500">Age classification: </span>
                <span className="text-[#ddd] sm:text-sm leading-7">
                  {adult ? 'Yes' : 'No'}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovieDetailModal;
