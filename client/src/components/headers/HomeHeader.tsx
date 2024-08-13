import { Link } from "react-router-dom";
import "./HomeHeader.css";

function AppHeader() {
  return (
    <header>
      <div className="logo">
        <img src="/img/logo.svg" alt="" />
      </div>
      <div className="title">
        <Link to="/">TaskSync</Link>
      </div>

      <Link to="/signup" className="sign_up_button nav_button">
        Sign up for free
      </Link>
      <Link to="/login" className="nav_button">
        Log in
      </Link>
      <div className="header-divider"></div>
      <Link to="/help" className="nav_button">
        Help
      </Link>
      <Link to="/download" className="nav_button">
        Download
      </Link>
      <Link to="/features" className="nav_button">
        Features
      </Link>
      {/* <a href="/donate" className="nav_button">Donate</a> */}
    </header>
  );
}

export default AppHeader;
