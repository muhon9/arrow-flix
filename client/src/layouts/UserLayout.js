import { Outlet } from "react-router-dom";
import MovieDetailModal from "../components/Modals/MovieDetailModal";
import Navbar from "../components/Navbar/Navbar";

export default function UserLayout() {
  return (
    <div>
      <Navbar />
      <MovieDetailModal />
      <Outlet />
    </div>
  );
}
