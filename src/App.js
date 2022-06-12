import MovieDetailModal from "./components/Modals/MovieDetailModal";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MovieDetailModal />
      <>
        <HomePage />
      </>
    </div>
  );
}

export default App;
