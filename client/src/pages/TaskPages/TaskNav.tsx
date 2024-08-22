import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFolderPlus,
  faInbox,
  faRectangleHistoryCirclePlus,
  faCheck,
  faCalendarStar,
  faCalendarClock,
  faCalendarImage,
  faSquareCheck,
} from "@fortawesome/pro-solid-svg-icons";
import styles from "./TaskNav.module.css";

type TaskCategory =
  | "inbox"
  | "all"
  | "today"
  | "scheduled"
  | "one_day"
  | "completed";

interface TaskNavProps {
  activeCategory: TaskCategory;
  setActiveCategory: (category: TaskCategory) => void;
}

const TaskNav: React.FC<TaskNavProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className={styles.tasksNav}>
      <ul className={styles.wrapper}>
        <div className={styles.actionsWrapper}>
          <ul className={styles.topBarActions}>
            <li>
              <button className={styles.topBarActionButton}>
                <FontAwesomeIcon className={styles.icon} icon={faPlus} />
              </button>
            </li>
            <li>
              <button className={styles.topBarActionButton}>
                <FontAwesomeIcon className={styles.icon} icon={faFolderPlus} />
              </button>
            </li>
            <li>
              {/* <button className={styles.topBarActionButton}> */}
              <FontAwesomeIcon
                className={`${styles.icon} ${styles.rectangleHistoryCirclePlus}`}
                icon={faRectangleHistoryCirclePlus}
              />
              {/* </button> */}
            </li>
          </ul>
        </div>
        <div className={styles.listWrapper}>
          <li>
            <button
              className={`${styles.navLink} ${
                activeCategory === "inbox" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("inbox")}
            >
              <FontAwesomeIcon className={styles.icon} icon={faInbox} />
              Inbox
            </button>
          </li>
          <li>
            <button
              className={`${styles.navLink} ${
                activeCategory === "all" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("all")}
            >
              <FontAwesomeIcon className={styles.icon} icon={faCheck} />
              All
            </button>
          </li>
          <li>
            <button
              className={`${styles.navLink} ${
                activeCategory === "today" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("today")}
            >
              <FontAwesomeIcon className={styles.icon} icon={faCalendarStar} />
              Today
            </button>
          </li>
          <li>
            <button
              className={`${styles.navLink} ${
                activeCategory === "scheduled" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("scheduled")}
            >
              <FontAwesomeIcon className={styles.icon} icon={faCalendarClock} />
              Scheduled
            </button>
          </li>
          <li>
            <button
              className={`${styles.navLink} ${
                activeCategory === "one_day" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("one_day")}
            >
              <FontAwesomeIcon className={styles.icon} icon={faCalendarImage} />
              One Day
            </button>
          </li>
          <li>
            <button
              className={`${styles.navLink} ${
                activeCategory === "completed" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("completed")}
            >
              <FontAwesomeIcon className={styles.icon} icon={faSquareCheck} />
              Completed
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default TaskNav;
