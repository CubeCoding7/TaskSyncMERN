import { faCalendar, faStickyNote } from "@fortawesome/pro-solid-svg-icons";
import WidgetSmall from "../components/WidgetSmall";
import WidgetLarge from "../components/WidgetLarge";
import styles from "../components/Widget.module.css";

function AppPage() {
  return (
    <div className={styles.widgets}>
      <WidgetLarge name="Calendar" icon={faCalendar} />
      <WidgetSmall name="Notes" icon={faStickyNote} />
    </div>
  );
}

export default AppPage;
