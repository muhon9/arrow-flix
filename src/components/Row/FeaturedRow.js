import { useEffect, useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import useViewport from "../../hooks/useViewport";
import { selectFeatured } from "../../redux/featured/featuredSelectors";
import { getFeatured } from "../../redux/featured/featuredSlice";
import FeaturedPoster from "../Posters/FeaturedPoster";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const FeaturedRow = () => {
  const { width } = useViewport();
  const dispatch = useDispatch();
  const { loading, error, data: results } = useSelector(selectFeatured);

  useEffect(() => {
    dispatch(getFeatured());
  }, []);

  //Custom Swiper config
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const customSwiperParams = {
    // autoplay: {
    //   delay: 5000,
    // },
    observer: true,
    observeParents: true,
    navigation: {
      prevEl: navigationPrevRef.current,
      nextEl: navigationNextRef.current,
    },
    breakpoints: {
      1378: { slidesPerView: 7, slidesPerGroup: 4 },
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

  const rightMouseOver = (e) => {
    if (e.currentTarget.classList.contains("right")) {
      e.currentTarget.parentElement.classList.add("is-right");
    } else if (e.currentTarget.classList.contains("left")) {
      e.currentTarget.parentElement.classList.add("is-left");
    }
  };

  const rightMouseOut = (e) => {
    e.currentTarget.parentElement.classList.remove("is-right", "is-left");
  };

  const insertPositionClassName = (index) => {
    const i = index + 1;

    if (i === 1) return "left";
    else if (i === 20) return "right";

    if (width >= 1378) {
      if ([7, 13, 19].includes(i)) return "left";
      else if ([6, 12, 18].includes(i)) return "right";
    } else if (width >= 998) {
      if ([5, 9, 13, 17].includes(i)) return "left";
      else if ([4, 8, 12, 16].includes(i)) return "right";
    } else if (width >= 768) {
      if ([4, 7, 10, 13, 16].includes(i)) return "left";
      else if ([3, 6, 9, 12, 15, 18].includes(i)) return "right";
    }
  };

  return (
    <div className="block py-[1.5vh] lg:py-[1.5vh]">
      {error && <div className="Row__not-loaded">Oops, an error occurred.</div>}
      {loading && <div>Loading.......</div>}
      {!loading && !error && (
        <>
          <h3 className=" py-0 px-[4%] text-base leading-[1.25vw] align-left inline-block ">
            <Link to="/" className="text-white no-underline">
              <span className="text-md font-semibold">Featured Movies</span>
              <span className="max-w-[200px] ml-2">Show all </span>
            </Link>
          </h3>
          <div className="relative">
            <div
              className="absolute top-0 flex items-center justify-center text-white w-[4%] h-full bg-gray-400/[0.1] z-[10] left-0 rounded-r-md"
              ref={navigationPrevRef}
            >
              <MdChevronLeft
                className="FeaturedRow
            __slider--mask-icon left "
                size="3em"
                // style={{ color: "gray" }}
              />
            </div>
            <div
              className="absolute top-0 flex items-center justify-center text-white w-[4%] h-full bg-gray-400/[0.1] z-[10] right-0"
              ref={navigationNextRef}
            >
              <MdChevronRight
                className="FeaturedRow
            __slider--mask-icon right"
                size="3em"
                style={{ color: "white" }}
              />
            </div>
            <Swiper
              {...customSwiperParams}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
              }}
              className="mt-4 px-[4%]"
            >
              {results &&
                results.map((movie, i) => (
                  <SwiperSlide
                    key={i}
                    onMouseOver={rightMouseOver}
                    onMouseOut={rightMouseOut}
                    className=""
                  >
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
