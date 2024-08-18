import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/navigation/SideBar";
import AppHeader from "./components/navigation/AppHeader";
import styles from "./AppLayout.module.css";

const AppLayout: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <AppHeader />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
