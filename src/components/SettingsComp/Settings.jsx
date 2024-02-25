import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import eye icons
import { fetchUserData, updateUserSettings } from '../../apis/userApi'; // Import fetchUserData and updateUserSettings functions
import styles from './Settings.module.css';
import { Toaster, toast } from 'react-hot-toast'; // Import Toaster and toast from react-hot-toast


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
    const {error} =response;

    if (!error) {
      toast.success('Settings updated successfully', {
        position: 'bottom-left',
        style: {
          padding: '16px',
          borderRadius: '0.3125rem',
          backgroundColor: '#192A32',
          color: '#FFF',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: '800',
          fontSize: '1.25rem'
        }
      });
    } else if (error === "Old password is incorrect") {
      toast.error('Old password is incorrect. Please try again.', {
        position: 'bottom-left',
        style: {
          padding: '16px',
          borderRadius: '0.3125rem',
          backgroundColor: '#192A32',
          color: '#FFF',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: '800',
          fontSize: '1.25rem'
        }
      });
    } else {
      setError('Failed to update settings');
      toast.error('Failed to update settings. Please try again.', {
        position: 'bottom-left',
        style: {
          padding: '16px',
          borderRadius: '0.3125rem',
          backgroundColor: '#192A32',
          color: '#FFF',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: '800',
          fontSize: '1.25rem'
        }
      });
    }
  } catch (error) {
    setError('Failed to update settings');
    toast.error('Failed to update settings. Please try again.', {
      position: 'bottom-left',
      style: {
        padding: '16px',
        borderRadius: '0.3125rem',
        backgroundColor: '#192A32',
        color: '#FFF',
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: '800',
        fontSize: '1.25rem'
      }
    });
  }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // <div className={styles.container}>
    //   <h2 className={styles.heading}>Settings</h2>
    //   {error && <p className={styles.error}>{error}</p>}
    //   <form onSubmit={handleSubmit}>
    //     <div className={styles.formGroup}>
    //       <FontAwesomeIcon icon={faUser} className={styles.icon} />
    //       <input
    //         type="text"
    //         name="name"
    //         value={formData.name} // Set the value of the input field to the fetched name
    //         onChange={handleChange}
    //         placeholder="Name"
    //         className={styles.inputField}
    //       />
    //     </div>
    //     <div className={styles.formGroup}>
    //       <FontAwesomeIcon icon={faLock} className={styles.icon} />
    //       <input
    //         type={showPassword ? 'text' : 'password'}
    //         name="oldPassword"
    //         value={formData.oldPassword}
    //         onChange={handleChange}
    //         placeholder="Old Password"
    //         className={styles.inputField}
    //         required
    //       />
    //       <FontAwesomeIcon
    //         icon={showPassword ? faEyeSlash : faEye} // Use eye icon instead of lock icon
    //         className={styles.eyeIcon}
    //         onClick={togglePasswordVisibility}
    //       />
    //     </div>
    //     <div className={styles.formGroup}>
    //       <FontAwesomeIcon icon={faLock} className={styles.icon} />
    //       <input
    //         type={showPassword ? 'text' : 'password'}
    //         name="newPassword"
    //         value={formData.newPassword}
    //         onChange={handleChange}
    //         placeholder="New Password"
    //         className={styles.inputField}
    //         required
    //       />
    //       <FontAwesomeIcon
    //         icon={showPassword ? faEyeSlash : faEye} // Use eye icon instead of lock icon
    //         className={styles.eyeIcon}
    //         onClick={togglePasswordVisibility}
    //       />
    //     </div>
    //     <button type="submit" className={styles.button}>
    //       Update
    //     </button>
    //   </form>
    // </div>
    <div className={styles.container}>
      <Toaster /> {/* Toaster component to display toast messages */}
      <h2 className={styles.heading}>Settings</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
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