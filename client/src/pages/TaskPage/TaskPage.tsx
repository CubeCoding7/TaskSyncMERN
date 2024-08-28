import { useEffect, useState } from "react";
import TaskNav from "../../components/TaskPage/TaskNav";
import styles from "./TaskPage.module.css";
import { TaskCategory } from "./types";
import Task from "../../components/TaskPage/components/Task";
import NewTaskForm from "../../components/TaskPage/NewTaskForm";
import { useTasksContext } from "../../hooks/useTasksContext";
import { useAuthContext } from "../../hooks/useAuthContext";

function TaskPage() {
  const [activeCategory, setActiveCategory] = useState<TaskCategory>("inbox");
  const [isVisible, setVisibility] = useState(false);

  const { user } = useAuthContext();

  const toggleVisibility = () => setVisibility((prev) => !prev);

  const { state, dispatch } = useTasksContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const token = user.token;

        if (!token) {
          throw new Error("Token is missing");
        }

        const response = await fetch("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await response.text();
        console.log("Response text:", text);
        const json = JSON.parse(text);
        dispatch({ type: "SET_TASKS", payload: json });
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

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
          {Array.isArray(state.tasks) &&
            state.tasks.map((task) => <Task key={task._id} task={task} />)}
        </div>
        {isVisible && <NewTaskForm toggleVisibility={toggleVisibility} />}
      </div>
    </div>
  );
}

export default TaskPage;
