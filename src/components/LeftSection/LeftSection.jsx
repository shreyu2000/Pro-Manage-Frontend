import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faDatabase, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import required icons
import styles from './LeftSection.module.css'; // Import the CSS module
import logo from '../../assets/icons/codesandbox.png'

const LeftSection = ({ activeLink, setActiveLink, handleLogout }) => {
  return (
    <nav className={styles.leftSection}>
      <div className={styles.logo}><img src={logo}/>Pro Manage</div>
      <ul className={styles.navLinks}>
        <li className={`${styles.navItem} ${activeLink === 'board' ? styles.active : ''}`} onClick={() => setActiveLink('board')}>
          <FontAwesomeIcon icon={faChalkboard} className={styles.icon} /> Board
        </li>
        <li className={`${styles.navItem} ${activeLink === 'analytics' ? styles.active : ''}`} onClick={() => setActiveLink('analytics')}>
          <FontAwesomeIcon icon={faDatabase} className={styles.icon} /> Analytics
        </li>
        <li className={`${styles.navItem} ${activeLink === 'settings' ? styles.active : ''}`} onClick={() => setActiveLink('settings')}>
          <FontAwesomeIcon icon={faCog} className={styles.icon} /> Settings
        </li>
      </ul>
      <button className={styles.logoutButton} onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt}  /> Log out
      </button>
    </nav>
  );
};

export default LeftSection;
