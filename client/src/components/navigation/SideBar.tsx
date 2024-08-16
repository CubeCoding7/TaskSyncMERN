import React from "react";
import {
  faHome,
  faTasks,
  faCalendar,
  faStickyNote,
} from "@fortawesome/pro-solid-svg-icons";
import styles from "./SideBar.module.css";
import SideBarButton from "../SideBarButton";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.iconSection}>
        <SideBarButton href="/app/home" icon={faHome} />
        <SideBarButton href="/app/tasks" icon={faTasks} />
        <SideBarButton href="/app/calendar" icon={faCalendar} />
        <SideBarButton href="/app/notes" icon={faStickyNote} />
      </div>
    </div>
  );
};

export default Sidebar;
