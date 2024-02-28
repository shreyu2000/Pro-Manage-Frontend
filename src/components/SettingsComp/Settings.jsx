import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import eye icons
import { fetchUserData, updateUserSettings } from '../../apis/userApi'; // Import fetchUserData and updateUserSettings functions
import styles from './Settings.module.css';
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css";
import lockIcon from '../../assets/icons/lock.svg'
import userIcon from '../../assets/icons/user.svg'

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
        setFormData(prevData => ({
          ...prevData,
          name: userData.name, // Update name with the user's name fetched from the API
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
      const updateData = {};
      if (name) {
        updateData.newName = name;
      }
      if (oldPassword && newPassword) {
        updateData.oldPassword = oldPassword;
        updateData.newPassword = newPassword;
      }

      const response = await updateUserSettings(updateData);
      console.log(response);

      if (!error) {
        toast.success("Settings Updated Successfully", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (error === "Old password is incorrect") {
        toast.error('Old password is incorrect. Please try again.');
      } else {
        setError('Failed to update settings');
        toast.error('Failed to update settings. Please try again.');
      }
    } catch (error) {
      setError('Failed to update settings');
      toast.error('Failed to update settings. Please try again.');
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
          <img src={userIcon} className={styles.icon} />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <img src={lockIcon} className={styles.icon} />
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
        <img src={lockIcon} className={styles.icon} />
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
