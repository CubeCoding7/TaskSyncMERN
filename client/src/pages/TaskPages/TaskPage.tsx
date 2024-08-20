import { useState } from "react";
import TaskNav from "./TaskNav";
import styles from "./TaskPage.module.css";
import { TaskCategory } from "./types";
import Task from "../../components/Task";

function TaskPage() {
  const [activeCategory, setActiveCategory] = useState<TaskCategory>("inbox");

  return (
    <div className={styles.taskPage}>
      <TaskNav
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className={styles.tasksContent}>
        {activeCategory === "inbox" && <h2>Inbox Tasks</h2>}
        {activeCategory === "all" && <h2>All Tasks</h2>}
        {activeCategory === "today" && <h2>Today's Tasks</h2>}
        {activeCategory === "scheduled" && <h2>Scheduled Tasks</h2>}
        {activeCategory === "one_day" && <h2>One Day Tasks</h2>}
        {activeCategory === "completed" && <h2>Completed Tasks</h2>}
        <div className={styles.tasks}>
          <ul>
            <Task />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
