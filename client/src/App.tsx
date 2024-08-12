import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeLayout from "./HomeLayout";
import AppLayout from "./AppLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/app" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
