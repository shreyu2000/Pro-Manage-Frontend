import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import eye icons
import { fetchUserData, updateUserSettings } from '../../apis/userApi'; // Import fetchUserData and updateUserSettings functions
import styles from './Settings.module.css';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: '', // Initialize name as an empty string
    oldPassword: '',
    newPassword: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Fetch user's data and update the form data
    const fetchUserSettings = async () => {
      try {
        const userData = await fetchUserData();
        console.log(userData);
        setFormData(prevData => ({
          ...prevData,
          name: userData.data.data.name, // Update name with the user's name fetched from the API
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      }
    };

    fetchUserSettings();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, oldPassword, newPassword } = formData;
    try {
      await updateUserSettings({ name, oldPassword, newPassword });
      // Redirect or show success message after successful update
    } catch (error) {
      setError('Failed to update settings');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Settings</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <input
            type="text"
            name="name"
            value={formData.name} // Set the value of the input field to the fetched name
            onChange={handleChange}
            placeholder="Name"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <FontAwesomeIcon icon={faLock} className={styles.icon} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            placeholder="Old Password"
            className={styles.inputField}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye} // Use eye icon instead of lock icon
            className={styles.eyeIcon}
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className={styles.formGroup}>
          <FontAwesomeIcon icon={faLock} className={styles.icon} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            className={styles.inputField}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye} // Use eye icon instead of lock icon
            className={styles.eyeIcon}
            onClick={togglePasswordVisibility}
          />
        </div>
        <button type="submit" className={styles.button}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Settings;
