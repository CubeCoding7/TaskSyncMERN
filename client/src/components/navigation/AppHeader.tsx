import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGear,
  faSearch,
  faUser,
} from "@fortawesome/pro-solid-svg-icons";
import styles from "./AppHeader.module.css";

function AppHeader() {
  const handleCollapseClick = () => {
    // a script to collapse/uncollapse the sidebar
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button onClick={handleCollapseClick} className={styles.navLink}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link to="/app/home" className={styles.headerTitle}>
          TaskSync
        </Link>
      </div>

      <div className={styles.headerCenter}>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search..." />
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <div className={styles.headerRight}>
        <Link to="/app/settings" className={styles.navLink}>
          <FontAwesomeIcon icon={faGear} />
        </Link>
        <button onClick={handleCollapseClick} className={styles.navLink}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
