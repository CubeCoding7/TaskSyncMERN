import { Link } from "react-router-dom";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  isVisible: boolean;
}

const Dropdown = ({ isVisible }: DropdownProps) => {
  return (
    <div
      className={`${styles.dropdownContent} ${isVisible ? styles.show : ""}`}
    >
      <div className={styles.accountSection}>
        <div className={styles.profile}>
          <img src="/img/logo.svg" alt="" />
          <div className={styles.profileDetails}>
            <span>
              Samuel Johnston{/* <%= user.firstName + ' ' + user.lastName %> */}
            </span>
            <span>sljohnston714@gmail.com{/* <%= user.email %> */}</span>
          </div>
        </div>
        <Link to="">Switch Accounts</Link>
        <Link to="">Manage Account</Link>
      </div>
      <div className={styles.sectionDivider}></div>
      <div>
        <Link to="/app/profile">Profile and Appearance</Link>
        <Link to="/app/settings">Settings</Link>
        <Link to="/app">Device theme</Link>
        <Link to="/app">Placeholder</Link>
        <Link to="/app">Placeholder</Link>
        <Link to="/app">Placeholder</Link>
      </div>
      <div className={styles.sectionDivider}></div>
      <div>
        <Link to="/download">Download the app</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
};

export default Dropdown;
