import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import styles from "./Widget.module.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  name: string;
  icon: IconProp;
}

const WidgetLarge = ({ name, icon }: Props) => {
  return (
    <div className={styles.widgetLarge}>
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
      <div className={`${styles.widgetBody} ${styles.widgetBodyLarge}`}></div>
    </div>
  );
};

export default WidgetLarge;
