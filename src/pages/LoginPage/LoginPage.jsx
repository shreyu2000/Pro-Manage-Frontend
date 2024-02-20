// LoginPage.jsx
import React from 'react';
import Login from '../../components/Login/Login';
import styles from './LoginPage.module.css'; // Import CSS module for styling
import Art from '../../assets/images/Art.png';

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.leftSection}>
        {/* <img src={Back}/> */}
        <img src={Art} alt="Welcome" />
        <h2>Welcome aboard, my friend</h2>
        <p>Just a couple of clicks and we start</p>
      </div>
      <div className={styles.rightSection}>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
