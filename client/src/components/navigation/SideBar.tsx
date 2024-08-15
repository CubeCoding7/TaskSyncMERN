import React from "react";
import { NavLink } from "react-router-dom";
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
        <NavLink
          to="/app/home"
          className={({ isActive }) =>
            isActive ? `${styles.iconLink} ${styles.active}` : styles.iconLink
          }
        >
          <div className={styles.iconActiveLine}></div>
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink
          to="/app/tasks"
          className={({ isActive }) =>
            isActive ? `${styles.iconLink} ${styles.active}` : styles.iconLink
          }
        >
          <div className={styles.iconActiveLine}></div>
          <FontAwesomeIcon icon={faTasks} />
        </NavLink>
        <NavLink
          to="/app/calendar"
          className={({ isActive }) =>
            isActive ? `${styles.iconLink} ${styles.active}` : styles.iconLink
          }
        >
          <div className={styles.iconActiveLine}></div>
          <FontAwesomeIcon icon={faCalendar} />
        </NavLink>
        <NavLink
          to="/app/notes"
          className={({ isActive }) =>
            isActive ? `${styles.iconLink} ${styles.active}` : styles.iconLink
          }
        >
          <div className={styles.iconActiveLine}></div>
          <FontAwesomeIcon icon={faStickyNote} />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
