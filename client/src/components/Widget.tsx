import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faStickyNote,
} from "@fortawesome/pro-solid-svg-icons";
import styles from "./Widget.module.css";

const Widget = () => {
  return (
    <div className={styles.widgets}>
      <div className={styles.widgetLarge}>
        <div className={styles.widgetHead}>
          <ul>
            <li>
              <FontAwesomeIcon
                icon={faStickyNote}
                className={`${styles.icon} ${styles.titleIcon}`}
              />
            </li>
            <li className={styles.widgetTitle}>Notes - Today</li>
            <li className={styles.chevron}>
              <FontAwesomeIcon icon={faChevronLeft} className={styles.left} />
            </li>
            <li className={styles.chevron}>
              <FontAwesomeIcon icon={faChevronRight} />
            </li>
          </ul>
        </div>
        <div className={`${styles.widgetBody} ${styles.widgetBodyLarge}`}></div>
      </div>
      <div className={styles.widgetSmall}>
        <div className={styles.widgetHead}>
          <ul>
            <li>
              <FontAwesomeIcon
                icon={faStickyNote}
                className={`${styles.icon} ${styles.titleIcon}`}
              />
            </li>
            <li className={styles.widgetTitle}>Notes - Today</li>
            <li className={styles.chevron}>
              <FontAwesomeIcon icon={faChevronLeft} className={styles.left} />
            </li>
            <li className={styles.chevron}>
              <FontAwesomeIcon icon={faChevronRight} />
            </li>
          </ul>
        </div>
        <div className={`${styles.widgetBody} ${styles.widgetBodySmall}`}></div>
      </div>
    </div>
  );
};

export default Widget;
