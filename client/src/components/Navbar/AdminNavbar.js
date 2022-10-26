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
      className="fixed w-full h-[50px] t-0 flex items-center justify-start py-2 bg-gray-800 text-white z-50"
      variants={navbarFadeInVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <Link to="/admin">
        <img
          className="w-12 md:w-48 items-center md:p-8"
          src={width >= 768 ? LOGO_URL : MOBILE_LOGO_URL}
          alt="Logo"
        />
      </Link>

      <div className="w-full flex justify-between px-8">
        <div>
          <a href="/" target="_blank">
            View Site
          </a>
        </div>
        <div>
          <button
            onClick={() => dispatch(userLogedOut())}
            className="px-2 py-1 justify-center bg-red-600 text-white rounded-md text-base font-medium cursor-pointer no-underline transition-all duration-200 ease-out hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default AdminNavbar;
