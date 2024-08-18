import TaskNav from "./TaskNav";
import styles from "./TaskPage.module.css";

function TaskPage() {
  return (
    <div className={styles.taskPage}>
      <TaskNav />
    </div>
  );
}

export default TaskPage;
