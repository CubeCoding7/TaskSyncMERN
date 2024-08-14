import React from "react";
import Sidebar from "./components/navigation/SideBar"; // Adjust path if necessary
import AppHeader from "./components/navigation/AppHeader"; // Your existing header component
import styles from "./AppLayout.module.css"; // Adjust path if necessary
import AppPage from "./pages/AppPage";

const AppLayout: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <AppHeader />
        <AppPage />
      </div>
    </div>
  );
};

export default AppLayout;
