import React, { useState } from "react";
// import { useTasksContext } from "../../hooks/useTasksContext";
import styles from "./Task.module.css";
import Checkbox from "./Checkbox";

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
  const [isChecked, setIsChecked] = useState(false);

  const formatDate = (date: Date | string) => {
    const d = new Date(date);

    const timezoneOffset = d.getTimezoneOffset() * 60000;
    const localDate = new Date(d.getTime() + timezoneOffset);
    return localDate.toLocaleDateString();
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };
  return (
    <div className={styles.task}>
      {/* <form action="/app/tasks/toggle" method="POST">
        <input type="hidden" name="taskId" />
        <input type="checkbox" name="completed" />
      </form> */}
      <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      <p>{task.name}</p>
      <p className={styles.dueDate}>
        {task.dueDate ? formatDate(task.dueDate) : ""}
      </p>
    </div>
  );
};

export default Task;
