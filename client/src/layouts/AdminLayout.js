import { Route, Routes } from "react-router-dom";
import AddMoviePage from "../pages/adminPages/AddMoviePage";

export default function AdminLayout() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AddMoviePage />} />
      </Routes>
    </div>
  );
}
