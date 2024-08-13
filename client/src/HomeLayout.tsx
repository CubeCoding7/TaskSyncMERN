import { Outlet } from "react-router-dom";
import HomeHeader from "./components/headers/HomeHeader";

function HomeLayout() {
  return (
    <div className="App">
      <HomeHeader />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
