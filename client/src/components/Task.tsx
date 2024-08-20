import styles from "./Task.module.css";

const Task = () => {
  return (
    <li>
      <div className={styles.task}>
        <form action="/app/tasks/toggle" method="POST">
          <input type="hidden" name="taskId" />
          <input type="checkbox" name="completed" />
        </form>
        <p>Test</p>
        <p className={styles.dueDate}>Jul 15</p>
      </div>
    </li>
  );
};
export default Task;
