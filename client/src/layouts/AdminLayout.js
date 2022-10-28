import { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useAuthCheck from 'hooks/useAuthCheck';

import { selectAuth } from 'redux/auth/authSelector';

import LoadingSpinner from 'components/ui/LoadingSpinner';
import AdminNavbar from 'components/Navbar/AdminNavbar';
import SideBar from 'components/Navbar/SideBar';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const authChecked = useAuthCheck();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (authChecked && !auth?.tokens) {
      navigate(`/login?from=${location.pathname}`);
    }
  }, [auth]);

  return authChecked ? (
    <div className="relative">
      <div className="flex flex-col justify-center items-center sm:hidden h-screen w-screen text-white text-center">
        Admin Pannel is not mobile friendly. Please browse from a desktop :(
        <Link to="/" className="bg-red-700 p-2 mt-4">
          Browse Regular Site
        </Link>
      </div>
      <AdminNavbar />
      <div className="flex text-white pt-[50px]">
        <SideBar />
        <main className="p-4  text-gray-800 flex-grow bg-gray-200">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
}
