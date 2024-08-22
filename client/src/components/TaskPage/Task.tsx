import styles from "./Task.module.css";

interface Props {
  name: string;
  dueDate: Date;
}

const Task = ({ name, dueDate }: Props) => {
  return (
    <li>
      <div className={styles.task}>
        <form action="/app/tasks/toggle" method="POST">
          <input type="hidden" name="taskId" />
          <input type="checkbox" name="completed" />
        </form>
        <p>{name}</p>
        <p className={styles.dueDate}>{dueDate.toLocaleDateString()}</p>
      </div>
    </li>
  );
};
export default Task;
