import styles from "./NewTaskForm.module.css";

const NewTask = () => {
  return (
    <form action="/app/tasks/add/task" className={styles.newTaskForm}>
      <div className={styles.inputArea}>
        <input type="text" name="name" placeholder="New task" required />
        <textarea name="description" placeholder="Description"></textarea>
      </div>
      <div className={styles.actions}>
        <input type="date" name="dueDate" />
        <div>
          <button type="button" className={styles.cancelButton}>
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

export default NewTask;
