import { useRef } from "react";
import { Link } from "react-router-dom";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import useViewport from "../../hooks/useViewport";
import FeaturedPoster from "../Posters/FeaturedPoster";

SwiperCore.use([Navigation, Pagination]);

const Row = () => {
  let loading = false;
  const { width } = useViewport();
  let results = ["1", "2", "3", "4", "5", "2", "3", "4", "5"];

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
      1378: { slidesPerView: 6, slidesPerGroup: 6 },
      998: { slidesPerView: 4, slidesPerGroup: 4 },
      625: { slidesPerView: 3, slidesPerGroup: 3 },
      330: { slidesPerView: 2, slidesPerGroup: 2 },
      0: { slidesPerView: 1.5, slidesPerGroup: 1.5 },
    },
    loopAdditionalSlides:
      width >= 1378 ? 5 : width >= 998 ? 3 : width >= 625 ? 2 : 2,
    pagination: true,
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
      {loading ? (
        <div className="Row__not-loaded">Here we will give skeleton</div>
      ) : (
        <h3 className="mb-1 py-0 px-[4%] text-base leading-[1.25vw] lg:text-lg text-left inline-block">
          <Link to={`/`} className="text-white no-underline ">
            <span className="font-bold mr-1">Featured Movies</span>
            <span className="Row__showmore">
              Show all
              {/* Show all <FiChevronRight /> */}
            </span>
          </Link>
        </h3>
      )}
      <div className="relative">
        {/* <div className="Row__slider--mask left" ref={navigationPrevRef}>
          <MdChevronLeft
            className="Row__slider--mask-icon left"
            size="3em"
            style={{ color: "white" }}
          />
        </div>
        <div className="Row__slider--mask right" ref={navigationNextRef}>
          <MdChevronRight
            className="Row__slider--mask-icon right"
            size="3em"
            style={{ color: "white" }}
          />
        </div> */}
        <Swiper
          {...customSwiperParams}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }}
          className="z-100"
        >
          {results &&
            results.map((movie, i) => (
              <SwiperSlide
                key={i}
                onMouseOver={rightMouseOver}
                onMouseOut={rightMouseOut}
                className="flex items-center justify-center"
              >
                <FeaturedPoster />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Row;
