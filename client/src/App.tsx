import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import HomeLayout from "./HomeLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AppPage from "./pages/AppPage";
import AppLayout from "./AppLayout";
import PlaceholderPage from "./pages/PlaceHolderPage";
import TaskPage from "./pages/TaskPage";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  // const { user } = useAuthContext();

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
            <Route path="/password/forgot" element={<ForgotPassword />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/app/home" element={<AppPage />} />
            <Route path="/app/tasks" element={<TaskPage />} />
            <Route path="/app/calendar" element={<PlaceholderPage />} />
            <Route path="/app/notes" element={<PlaceholderPage />} />
            <Route path="/app/settings" element={<PlaceholderPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
