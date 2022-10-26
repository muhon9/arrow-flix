import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useAuthCheck from 'hooks/useAuthCheck';

import { selectAuth } from 'redux/auth/authSelector';

import LoadingSpinner from 'components/ui/LoadingSpinner';
import AdminNavbar from 'components/Navbar/AdminNavbar';
import SideBar from 'components/Navbar/SideBar';

export default function AdminLayout() {
  const navigate = useNavigate();
  const authChecked = useAuthCheck();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (auth?.user && auth?.tokens) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  }, [auth]);

  return authChecked ? (
    <div>
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
