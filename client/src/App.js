import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={UserLayout} />
      </Routes>

      {/* <BasicLayout>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tvseries" element={<TVSeriesPage />} />
        <Route path="/genre/:categoryName" element={<GenreWisePage />} />
      </BasicLayout>
      <AdminLayout>
        <Route path="/admin/addmovie" element={<AddMoviePage />} />
      </AdminLayout> */}
    </div>
  );
}

export default App;
