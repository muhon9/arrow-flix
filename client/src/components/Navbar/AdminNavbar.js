import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useScroll from "../../hooks/useScroll";
import useViewport from "../../hooks/useViewport";
// import { LOGO_URL, MOBILE_LOGO_URL, PROFILE_PIC_URL } from "../../requestUrls";
import MOBILE_LOGO_URL from "../../assets/images/Netflix-Mobile-Logo.png";
import LOGO_URL from "../../assets/images/NetFlix.png";
import { navbarFadeInVariants } from "../../utilities/motionUtils";

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
        className="fixed bg-gray-800 text-white z-50 w-full h-[50px] t-0 flex items-center justify-start py-2 "
        variants={navbarFadeInVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <Link to="/admin">
          <img
            className="w-[45px] items-center md:p-8 md:w-[192px] "
            src={width >= 600 ? LOGO_URL : MOBILE_LOGO_URL}
            alt="Logo"
          />
        </Link>
        <ul className=" md:flex items-center m-0 p-0 ml-8">
          <li className="inline-block my-0 mx-3 text-sm sm:text-md md:text-lg">
            <a href="/" target="_blank">
              View Site
            </a>
          </li>
        </ul>

        <div className="flex items-center m-0 p-0 ml-auto">
          <div>
            <button className="justify-center   bg-red-600 text-white ml-[10px] border-0 rounded-md text-base font-medium cursor-pointer no-underline transition-all duration-200 ease-out hover:bg-red-700">
              Login
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default AdminNavbar;
