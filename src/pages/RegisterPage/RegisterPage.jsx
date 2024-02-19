// RegisterPage.jsx
import React from 'react';
import Register from '../../components/Register/Register';;
import styles from './RegisterPage.module.css'; // Import CSS module for styling
import Art from '../../assets/images/Art.png';
import Back from '../../assets/images/Back.png'

const RegisterPage = () => {
  return (
    <div className={styles.registerPage}>
      <div className={styles.leftSection}>
        {/* <img src={Back}/> */}
        <img src={Art} alt="Welcome" />
        <h2>Welcome aboard, my friend</h2>
        <p>Just a couple of clicks and we start</p>
      </div>
      <div className={styles.rightSection}>
        <Register/>
      </div>
    </div>
  );
};

export default RegisterPage;
