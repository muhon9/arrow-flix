import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useGetFeaturedMoviesQuery } from 'redux/api/rootApi';
import useViewport from 'hooks/useViewport';

import SkeletonPosterRow from 'components/Skelitons/SkeletonPosterRow';
import FeaturedPoster from 'components/Posters/FeaturedPoster';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const FeaturedRow = () => {
  const { width } = useViewport();

  const {
    isError: error,
    isLoading: loading,
    data,
  } = useGetFeaturedMoviesQuery();

  //Custom Swiper config
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const customSwiperParams = {
    observer: true,
    observeParents: true,
    navigation: {
      prevEl: navigationPrevRef.current,
      nextEl: navigationNextRef.current,
    },
    breakpoints: {
      1378: { slidesPerView: 4, slidesPerGroup: 4 },
      998: { slidesPerView: 4, slidesPerGroup: 3 },
      625: { slidesPerView: 3, slidesPerGroup: 3 },
      330: { slidesPerView: 2, slidesPerGroup: 2 },
      0: { slidesPerView: 1.5, slidesPerGroup: 1.5 },
    },
    loopAdditionalSlides:
      width >= 1378 ? 5 : width >= 998 ? 3 : width >= 625 ? 2 : 2,
    pagination: false,
    loop: false,
    grabCursor: false,
    draggable: false,
    preventClicksPropagation: true,
    preventClicks: true,
    slideToClickedSlide: false,
    allowTouchMove: true,
  };

  return (
    <div className="block py-[1.5vh] lg:py-[1.5vh]">
      {error && <div>An Error Occured</div>}
      {loading && <SkeletonPosterRow posterType="backdrop" />}
      {!loading && !error && (
        <>
          <h3 className=" py-0 px-[4%] text-base leading-[1.25vw] align-left inline-block ">
            <Link to="/genre/featured" className="text-white no-underline">
              <span className="text-md font-semibold">Featured Movies</span>
              <span className="max-w-[200px] ml-2">Show all </span>
            </Link>
          </h3>
          <div className="relative">
            <div
              className="absolute top-0 flex items-center justify-center text-white w-[4%] h-full bg-gray-400/[0.1] z-[10] left-0 rounded-r-md"
              ref={navigationPrevRef}
            >
              <MdChevronLeft size="3em" />
            </div>
            <div
              className="absolute top-0 flex items-center justify-center text-white w-[4%] h-full bg-gray-400/[0.1] z-[10] right-0"
              ref={navigationNextRef}
            >
              <MdChevronRight size="3em" style={{ color: 'white' }} />
            </div>
            <Swiper
              {...customSwiperParams}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
              }}
              className="mt-4 px-[4%]"
            >
              {data?.results &&
                data.results.map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <FeaturedPoster result={movie} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedRow;
