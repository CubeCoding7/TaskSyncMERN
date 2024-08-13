import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AppPage from "./pages/AppPage";
import AppLayout from "./AppLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/features" element={<LoginPage />} />
            <Route path="/download" element={<SignupPage />} />
            <Route path="/help" element={<SignupPage />} />
          </Route>
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<AppPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
