import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons"; // Import required icons
import styles from "./LeftSection.module.css"; // Import the CSS module
import logo from "../../assets/icons/codesandbox.svg";
import BoardIcon from "../../assets/icons/board.svg";
import DatabaseIcon from "../../assets/icons/database.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import Logout from "../../assets/icons/Logout.svg";

const LeftSection = ({ activeLink, setActiveLink, openLogoutPopup }) => {
  return (
    <nav className={styles.leftSection}>
      {/* <div className={styles.logo}><img src={logo} alt="Pro Manage Logo" />Pro Manage</div> */}
      <ul className={styles.navLinks}>
        <li className={`${styles.navItem} ${styles.logo}`}>
          <img src={logo} alt="Pro Manage Logo" />
          Pro Manage
        </li>
        <li
          className={`${styles.navItem} ${
            activeLink === "board" ? styles.active : ""
          }`}
          onClick={() => setActiveLink("board")}
        >
          <img src={BoardIcon} className={styles.icon} alt="Board Icon" /> Board
        </li>
        <li
          className={`${styles.navItem} ${
            activeLink === "analytics" ? styles.active : ""
          }`}
          onClick={() => setActiveLink("analytics")}
        >
          <img src={DatabaseIcon} className={styles.icon} alt="Database Icon" />{" "}
          Analytics
        </li>
        <li
          className={`${styles.navItem} ${
            activeLink === "settings" ? styles.active : ""
          }`}
          onClick={() => setActiveLink("settings")}
        >
          <img src={SettingsIcon} className={styles.icon} alt="Settings Icon" />{" "}
          Settings
        </li>
      </ul>
      <button className={styles.logoutButton} onClick={openLogoutPopup}>
        <img src={Logout} /> Log out
      </button>
    </nav>
  );
};

export default LeftSection;
