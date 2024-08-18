<<<<<<< HEAD
import Widget from "../components/Widget";
import styles from "./AppPage.module.css";
import {
  faCalendarDays,
  faListCheck,
  faStickyNote,
} from "@fortawesome/pro-solid-svg-icons";
=======
import WidgetSmall from "../components/WidgetSmall";
import WidgetLarge from "../components/WidgetLarge";
import styles from "../components/Widget.module.css";
>>>>>>> ba8c4cd95ec7c22abc1cff8ef71d4a9063d8463a

function AppPage() {
  return (
    <div className={styles.widgets}>
<<<<<<< HEAD
      <Widget name="Tasks" icon={faListCheck} />
      <Widget name="Notes" icon={faStickyNote} />
      <Widget name="Calendar" icon={faCalendarDays} />
      <Widget name="Notes" icon={faStickyNote} />
=======
      <WidgetLarge name="Calendar" icon={faCalendar} />
      <WidgetSmall name="Notes" icon={faStickyNote} />
>>>>>>> ba8c4cd95ec7c22abc1cff8ef71d4a9063d8463a
    </div>
  );
}

export default AppPage;
