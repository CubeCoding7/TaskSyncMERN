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
import { Link } from "react-router-dom";

function taskNav() {
  return (
    <div className={styles.tasksNav}>
      <ul className={styles.wrapper}>
        <div className={styles.actionsWrapper}>
          <ul className={styles.topBarActions}>
            <li>
              <FontAwesomeIcon className={styles.icon} icon={faPlus} />
            </li>
            <li>
              <FontAwesomeIcon className={styles.icon} icon={faFolderPlus} />
            </li>
            <li>
              <FontAwesomeIcon
                className={`${styles.icon} ${styles.rectangleHistoryCirclePlus}`}
                icon={faRectangleHistoryCirclePlus}
              />
            </li>
          </ul>
        </div>
        <div className={styles.listWrapper}>
          <li>
            <Link
              className="<%= activeSection==='Inbox' ? 'active' : '' %>"
              to="/app/tasks/inbox"
            >
              <FontAwesomeIcon className={styles.icon} icon={faInbox} />
              Inbox
            </Link>
          </li>
          <li>
            <Link
              className="<%= activeSection === 'All your tasks' ? 'active' : '' %>"
              to="/app/tasks/all"
            >
              <FontAwesomeIcon className={styles.icon} icon={faCheck} />
              All
            </Link>
          </li>
          <li>
            <Link
              className="<%= activeSection === 'Today&#39s tasks' ? 'active' : '' %>"
              to="/app/tasks/today"
            >
              <FontAwesomeIcon className={styles.icon} icon={faCalendarStar} />
              Today
            </Link>
          </li>
          <li>
            <Link
              className=" <%=activeSection==='Scheduled tasks' ? 'active' : '' %>"
              to="/app/tasks/scheduled"
            >
              <FontAwesomeIcon className={styles.icon} icon={faCalendarClock} />
              Scheduled
            </Link>
          </li>
          <li>
            <Link
              className="<%= activeSection === 'One Day' ? 'active' : '' %>"
              to="/app/tasks/one_day"
            >
              <FontAwesomeIcon className={styles.icon} icon={faCalendarImage} />
              One Day
            </Link>
          </li>
          <li>
            <Link
              className="<%= activeSection === 'Completed tasks' ? 'active' : '' %>"
              to="/app/tasks/completed"
            >
              <FontAwesomeIcon className={styles.icon} icon={faSquareCheck} />
              Completed
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default taskNav;
