import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

function App() {
  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Routes>
          <Route path="/*" element={<UserLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
