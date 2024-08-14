import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-solid-svg-icons";

function AppHeader() {
  const handleCollapseClick = () => {
    // a script to collapse/uncollapse the sidebar
  };

  return (
    <header>
      <div>
        <button onClick={handleCollapseClick} className="nav-link">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link to="/app" className="logo">
          TaskSync
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;
