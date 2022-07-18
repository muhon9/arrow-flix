import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/Navbar/AdminNavbar";

export default function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <main className="pt-[80px] h-[100vh] text-white border-2 border-red-500">
        <Outlet />
      </main>
    </>
  );
}
