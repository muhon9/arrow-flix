import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useViewport from 'hooks/useViewport';

import MOBILE_LOGO_URL from 'assets/images/Netflix-Mobile-Logo.png';
import LOGO_URL from 'assets/images/NetFlix.png';
import { navbarFadeInVariants } from 'utilities/motionUtils';
import { userLogedOut } from 'redux/auth/authSlice';

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const { width } = useViewport();

  return (
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
          <button
            onClick={() => dispatch(userLogedOut())}
            className="justify-center   bg-red-600 text-white ml-[10px] border-0 rounded-md text-base font-medium cursor-pointer no-underline transition-all duration-200 ease-out hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default AdminNavbar;
