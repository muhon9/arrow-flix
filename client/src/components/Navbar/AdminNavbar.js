import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useScroll from "../../hooks/useScroll";
import useViewport from "../../hooks/useViewport";
// import { LOGO_URL, MOBILE_LOGO_URL, PROFILE_PIC_URL } from "../../requestUrls";
import MOBILE_LOGO_URL from "../../assets/images/Netflix-Mobile-Logo.png";
import LOGO_URL from "../../assets/images/NetFlix.png";
import { navbarFadeInVariants } from "../../utilities/motionUtils";
import Searchbar from "../Searchbar/Searchbar";

const AdminNavbar = () => {
  const { width } = useViewport();
  const isScrolled = useScroll(70);
  const [genresNav, setGenresNav] = useState(false);
  const [profileNav, setProfileNav] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const genresNavRef = useRef();
  const profileNavRef = useRef();

  const handleClick = (e) => {
    console.log(e);
    console.log("hello");
    setGenresNav(!genresNav);
  };

  return (
    <>
      <motion.nav
        className={`fixed text-white z-50 w-full h-[70px] t-0 flex items-center justify-start py-0 px-[4vw]  ${
          isScrolled && "bg-lightBlack"
        }`}
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
            <NavLink to="/admin/addmovie">Add Movies</NavLink>
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
          <Searchbar />

          <div>
            <button className="hidden justify-center  min-w-[140px] bg-red-600 text-white py-[10px] px-[16px] ml-[10px] border-0 rounded-md text-base font-medium cursor-pointer no-underline transition-all duration-200 ease-out hover:bg-red-700">
              Login
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default AdminNavbar;
