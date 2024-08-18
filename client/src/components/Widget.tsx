import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import styles from "./Widget.module.css";

interface Props {
  name: string;
  icon: IconProp;
}

const Widget = ({ name, icon }: Props) => {
  return (
    <div className={styles.widget}>
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
      <div className={styles.widgetBody}></div>
    </div>
  );
};

export default Widget;
