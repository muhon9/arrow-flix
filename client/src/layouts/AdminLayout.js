import { Route, Routes } from "react-router-dom";
import AdminNavbar from "../components/Navbar/AdminNavbar";
import AddMoviePage from "../pages/adminPages/AddMoviePage";
import Dashboard from "../pages/adminPages/Dashboard";

export default function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <main className="pt-[80px] h-[100vh] text-white border-2 border-red-500">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addmovie" element={<AddMoviePage />} />
        </Routes>
      </main>
    </>
  );
}
