import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";
import RowCopy from "./components/Row/Row copy";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <div className="h-[400px] bg-white w-full">Hello</div>
      <RowCopy />
    </div>
  );
}

export default App;
