import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import styles from "../components/Widget.module.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  name: string;
  icon: IconProp;
}

const WidgetSmall = ({ name, icon }: Props) => {
  return (
    <div className={styles.widgetSmall}>
      <div className={styles.widgetHead}>
        <ul>
          <li>
            <FontAwesomeIcon
              icon={icon}
              className={`${styles.icon} ${styles.titleIcon}`}
            />
          </li>
          <li className={styles.widgetTitle}>{name} - Today</li>
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
  );
};

export default WidgetSmall;
