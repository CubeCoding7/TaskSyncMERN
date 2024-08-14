import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTasks,
  faCalendar,
  faStickyNote,
} from "@fortawesome/pro-solid-svg-icons";
import styles from "./SideBar.module.css"; // Adjust path if necessary

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.iconSection}>
        <Link to="/app" className={styles.iconLink}>
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link to="/app/tasks" className={styles.iconLink}>
          <FontAwesomeIcon icon={faTasks} />
        </Link>
        <Link to="/app/calendar" className={styles.iconLink}>
          <FontAwesomeIcon icon={faCalendar} />
        </Link>
        <Link to="/app/notes" className={styles.iconLink}>
          <FontAwesomeIcon icon={faStickyNote} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
