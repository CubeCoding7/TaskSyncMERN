import { Outlet } from "react-router-dom";
import TaskNav from "../pages/TaskPages/TaskNav";
import styles from "../pages/TaskPages/TaskPage.module.css";

function TaskLayout() {
  return (
    <div className={styles.taskPage}>
      <TaskNav />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default TaskLayout;
