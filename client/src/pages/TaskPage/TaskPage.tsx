import { useState } from "react";
import TaskNav from "../../components/TaskPage/TaskNav";
import styles from "./TaskPage.module.css";
import { TaskCategory } from "./types";
import Task from "../../components/TaskPage/Task";
import NewTask from "../../components/TaskPage/NewTaskForm";

function TaskPage() {
  const [activeCategory, setActiveCategory] = useState<TaskCategory>("inbox");
  const [isVisible, setVisibility] = useState(false);

  const toggleVisibility = () => setVisibility((prev) => !prev);

  return (
    <div className={styles.taskPage}>
      <TaskNav
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        toggleVisibility={toggleVisibility}
      />
      <div className={styles.tasksContent}>
        {activeCategory === "inbox" && <h2>Inbox</h2>}
        {activeCategory === "all" && <h2>All</h2>}
        {activeCategory === "today" && <h2>Today</h2>}
        {activeCategory === "scheduled" && <h2>Scheduled</h2>}
        {activeCategory === "one_day" && <h2>One Day</h2>}
        {activeCategory === "completed" && <h2>Completed</h2>}
        <div className={styles.tasks}>
          <ul>
            <Task name="Cool" dueDate={new Date(2024, 7, 20)} />
          </ul>
        </div>
        {isVisible && <NewTask toggleVisibility={toggleVisibility} />}
      </div>
    </div>
  );
}

export default TaskPage;
