import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useScroll from "../../hooks/useScroll";
import useViewport from "../../hooks/useViewport";
// import { LOGO_URL, MOBILE_LOGO_URL, PROFILE_PIC_URL } from "../../requestUrls";
import MOBILE_LOGO_URL from "../../assets/images/Netflix-Mobile-Logo.png";
import LOGO_URL from "../../assets/images/NetFlix.png";
import PROFILE_PIC_URL from "../../assets/images/Netflix_profilepic.png";
import { navbarFadeInVariants } from "../../utilities/motionUtils";

const Navbar = () => {
  const { width } = useViewport();
  const isScrolled = useScroll(70);
  const [genresNav, setGenresNav] = useState(false);
  const [profileNav, setProfileNav] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const genresNavRef = useRef();
  const profileNavRef = useRef();

  // useOutsideClick(genresNavRef, () => {
  //   if (genresNav) setGenresNav(false);
  // });
  // useOutsideClick(profileNavRef, () => {
  //   if (profileNav) setProfileNav(false);
  // });

  const handleClick = (e) => {
    console.log(e);
    console.log("hello");
    setGenresNav(!genresNav);
  };

  console.log(mobileNavOpen);

  return (
    <>
      <motion.nav
        className="fixed z-10 w-full h-[70px] t-0 flex items-center justify-start py-0 px-[4vw]"
        variants={navbarFadeInVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <Link to="/">
          <img
            className="w-full max-w-[40px] md:max-w-[130px]"
            src={width >= 600 ? LOGO_URL : MOBILE_LOGO_URL}
            alt=""
          />
        </Link>
        <ul className="hidden md:flex items-center m-0 p-0 ml-8">
          <li className="inline-block my-0 mx-3 text-sm sm:text-md md:text-lg">
            <NavLink to="/browse">Home</NavLink>
          </li>
          <li className="inline-block my-0 mx-3 text-sm sm:text-md md:text-lg">
            <NavLink to="/tvseries">TV Series</NavLink>
          </li>
          <li className="inline-block my-0 mx-3 text-sm sm:text-md md:text-lg">
            <NavLink to="/movies">Movies</NavLink>
          </li>
          <li className="inline-block my-0 mx-3 text-sm sm:text-md md:text-lg">
            <NavLink to="/popular">New & Popular</NavLink>
          </li>
          <li className="inline-block my-0 mx-3 text-sm sm:text-md md:text-lg">
            <NavLink to="/mylist">My list</NavLink>
          </li>
        </ul>
        <div className="absolute md:hidden top-[70px] left-0 my-0 mx-auto border-2 border-red-700 w-full h-[45px] justify-center items-center">
          <div
            className="flex items-center justify-center"
            onClick={() => {
              setMobileNavOpen(!mobileNavOpen);
            }}
          >
            <span>Discover</span> <FaCaretDown />
          </div>
          {mobileNavOpen && (
            <ul className="Navbar__primarynav--content-wrp">
              <li className="Navbar__navlinks--link">
                <NavLink to="/browse">Home</NavLink>
              </li>
              <li className="Navbar__navlinks--link">
                <NavLink to="/tvseries">TV Series</NavLink>
              </li>
              <li className="Navbar__navlinks--link">
                <NavLink to="/movies">Movies</NavLink>
              </li>
              <li className="Navbar__navlinks--link">
                <NavLink to="/popular">New & Popular</NavLink>
              </li>
              <li className="Navbar__navlinks--link">
                <NavLink to="/mylist">My list</NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className="flex items-center m-0 p-0 ml-auto">
          <div className="Navbar__navitem">Search</div>
          <button
            onClick={() => {
              console.log("button clicked");
            }}
          >
            Hellooo
          </button>
          <div className="Navbar__navitem">
            <div
              className="relative flex items-center cursor-pointer"
              //   className={`Navbar__navprofile ${profileNav && "active"}`}
              onClick={() => setProfileNav(!profileNav)}
            >
              <img
                className="max-w-[30px] w-full mr-2 sm:max-w-[40px] Navbar__navprofile--toggler"
                src={PROFILE_PIC_URL}
                alt="Profile"
              />
              <FaCaretDown className="Navbar__navprofile--toggler Navbar__navprofile--caret" />
              <div
                className={`block pointer-events-none absolute opacity-0 top-[100px] right-0 py-[10px] px-0 min-w-auto whitespace-nowrap border-[1px] border-solid border-gray-50 bg-black z-[1]  ${
                  profileNav ? "active" : ""
                }`}
              >
                {profileNav && (
                  <ul
                    className="Navbar__navprofile--content-wrp"
                    ref={profileNavRef}
                  >
                    <li
                      className="Navbar__navlinks--link"
                      // onClick={() => dispatch(signOutStart())}
                      onClick={handleClick}
                    >
                      Sign Out
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
