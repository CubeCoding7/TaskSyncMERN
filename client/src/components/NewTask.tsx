import styles from "./NewTask.module.css";

const NewTask = () => {
  return (
    <form action="/app/tasks/add/task" className={styles.newTaskForm}>
      <div className={styles.inputArea}>
        <input type="text" name="name" placeholder="New task" required />
        <textarea name="description" placeholder="Description"></textarea>
      </div>
      <input type="date" name="dueDate" />
      <input type="submit" value={"Add Task"} />
      <button type="button">Cancel</button>
    </form>
  );
};

export default NewTask;
