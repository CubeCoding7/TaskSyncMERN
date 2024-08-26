import React from "react";

const Dropdown = () => {
  return (
    <div className="dropdown-content" id="dropdownMenu">
      <div className="account-section">
        <div className="profile">
          <img src="/img/logo.svg" alt="" />
          <div className="profile-details">
            <span>{/* <%= user.firstName + ' ' + user.lastName %> */}</span>
            <span>{/* <%= user.email %> */}</span>
          </div>
        </div>
        <a href="">Switch Accounts</a>
        <a href="">Manage Account</a>
      </div>
      <div className="section-divider"></div>
      <div>
        <a href="/app/profile">Profile and Appearance</a>
        <a href="/app/settings">Settings</a>
        <a href="/app">Device theme</a>
        <a href="/app">Placeholder</a>
        <a href="/app">Placeholder</a>
        <a href="/app">Placeholder</a>
      </div>
      <div className="section-divider"></div>
      <div>
        <a href="/download">Download the app</a>
        <a href="/logout">Logout</a>
      </div>
    </div>
  );
};

export default Dropdown;
