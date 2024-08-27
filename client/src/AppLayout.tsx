import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/navigation/SideBar";
import AppHeader from "./components/navigation/AppHeader";
import styles from "./AppLayout.module.css";
import { useAuthContext } from "./hooks/useAuthContext";

const AppLayout: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <div className={styles.appContainer}>
      {!user ? <Navigate to="/" replace={true} /> : null}
      <Sidebar />
      <AppHeader />
      <div className={styles.mainContent}>
        <div className={styles.background}></div>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
