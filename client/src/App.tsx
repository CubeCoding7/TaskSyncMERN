import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages
import HomeLayout from "./HomeLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AppPage from "./pages/AppPage";
import AppLayout from "./AppLayout";
import PlaceholderPage from "./pages/PlaceHolderPage";
import TaskPage from "./pages/TaskPage";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={!user ? <HomeLayout /> : <Navigate to="/app/home" />}
          >
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/features" element={<LoginPage />} />
            <Route path="/download" element={<SignupPage />} />
            <Route path="/help" element={<SignupPage />} />
          </Route>
          <Route element={user ? <AppLayout /> : <Navigate to="/login" />}>
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
