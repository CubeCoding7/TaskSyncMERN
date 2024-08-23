import React from "react";
// import { useTasksContext } from "../../hooks/useTasksContext";
import styles from "./Task.module.css";

interface Task {
  _id: string;
  name: string;
  description: string;
  dueDate: Date;
  createdAt: string;
}

interface TaskProps {
  task: Task;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  // const { dispatch } = useTasksContext();

  // const handleClick = async () => {
  //   try {
  //     const response = await fetch(`/api/tasks/${task._id}`, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to delete task");
  //     }

  //     const json = await response.json();
  //     dispatch({ type: "DELETE_TASK", payload: json });
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <div className={styles.task}>
      <form action="/app/tasks/toggle" method="POST">
        <input type="hidden" name="taskId" />
        <input type="checkbox" name="completed" />
      </form>
      <p>{task.name}</p>
      <p className={styles.dueDate}>
        {task.createdAt ? formatDate(task.createdAt) : "No creation date"}
      </p>
    </div>
  );
};

export default Task;
