import React from 'react';
import Board from '../Board/Board'; // Import the Board component
import Analytics from '../Analytics/Analytics'; // Import the Analytics component
import Settings from '../SettingsComp/Settings'; // Import the Settings component
import styles from './RightSection.module.css'; // Import the CSS module

const RightSection = ({ activeLink }) => {
  return (
    <div className={styles.rightSection}>
      {activeLink === 'board' && <Board />}
      {activeLink === 'analytics' && <Analytics />}
      {activeLink === 'settings' && <Settings />}
    </div>
  );
};

export default RightSection;
