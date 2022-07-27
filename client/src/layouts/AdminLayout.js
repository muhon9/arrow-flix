import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import SideBar from "../components/Navbar/SideBar";

export default function AdminLayout() {
  return (
    <div>
      <AdminNavbar />
      <div className="flex text-white pt-[50px]">
        <SideBar />
        <main className="p-4 h-[100vh] text-gray-800 flex-grow bg-gray-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
