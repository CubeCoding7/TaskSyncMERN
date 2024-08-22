import React, { useState } from "react";
import styles from "./NewTaskForm.module.css";

interface Props {
  toggleVisibility: () => void;
}

const NewTaskForm = ({ toggleVisibility }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      name,
      description,
      dueDate,
    };

    try {
      const response = await fetch("http://localhost:5000/api/tasks/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message, clear form, etc.)
        toggleVisibility();
      } else {
        // Handle errors
        const result = await response.json();
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.newTaskForm}>
      <div className={styles.inputArea}>
        <input
          type="text"
          name="name"
          placeholder="New task"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.actions}>
        <input
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={toggleVisibility}
          >
            Cancel
          </button>
          <button type="submit" className={styles.addButton}>
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewTaskForm;
