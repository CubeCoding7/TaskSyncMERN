// HomeLayout.tsx
import { Outlet, Navigate } from "react-router-dom";
import HomeHeader from "./components/navigation/HomeHeader";
import { useAuthContext } from "./hooks/useAuthContext";

function HomeLayout() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      {user ? <Navigate to="/app/home" replace={true} /> : null}
      <HomeHeader />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
