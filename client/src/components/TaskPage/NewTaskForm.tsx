import React, { useState } from "react";
import styles from "./NewTaskForm.module.css";
import { useTasksContext } from "../../hooks/useTasksContext";

interface Props {
  toggleVisibility: () => void;
}

const NewTaskForm = ({ toggleVisibility }: Props) => {
  const { dispatch } = useTasksContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const task = { name, description, dueDate };

    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []); // Default to empty array if undefined
    }

    if (response.ok) {
      setName("");
      setDescription("");
      setDueDate("");
      setError(null);
      setEmptyFields([]);
      console.log("new task added", json);
      dispatch({ type: "CREATE_TASK", payload: json });

      // Hide the form if the task was successfully added
      toggleVisibility();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.newTaskForm}>
      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes("name") ? "error" : ""}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={emptyFields.includes("description") ? "error" : ""}
        ></textarea>
      </div>
      <div className={styles.actions}>
        <input
          type="Date"
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
          className={emptyFields.includes("dueDate") ? "error" : ""}
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

          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    </form>
  );
};

export default NewTaskForm;
