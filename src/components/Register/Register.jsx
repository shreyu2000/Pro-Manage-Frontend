import React, { useState } from "react";
import { registerUser } from "../../apis/userApi.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons"; // Importing lock icon from FontAwesome
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import styles from "./Register.module.css";
import EmailIcon from '../../assets/icons/email.svg';
import lockIcon from '../../assets/icons/lock.svg'
import userIcon from '../../assets/icons/user.svg'

const Register = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      return;
    }
    // Extract only necessary fields before sending:
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    const { data, error } = await registerUser(dataToSend);

    if (error) {
      setError(error);
    } else {
      console.log("User registered successfully:", data);
      navigate("/dashboard");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Register</h2>
      {error && <p>{error}</p>}
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
          <p className={styles.error}>{errors.name}</p>
        </div>
        <div className={styles.formGroup}>
          <img src={EmailIcon} className={styles.icon} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={styles.inputField}
            required
          />
          <p className={styles.error}>{errors.email}</p>
        </div>
        <div className={styles.formGroup}>
          <img src={lockIcon} className={styles.icon} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={styles.inputField}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className={styles.eyeIcon}
            onClick={togglePasswordVisibility}
          />
          <p className={styles.error}>{errors.password}</p>
        </div>
        <div className={styles.formGroup}>
        <img src={lockIcon} className={styles.icon} />

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className={styles.inputField}
            required
          />
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEyeSlash : faEye}
            className={styles.eyeIcon}
            onClick={toggleConfirmPasswordVisibility}
          />
          <p className={styles.error}>{errors.confirmPassword}</p>
        </div>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
      <p className={styles.account}>Have an account? </p>
      <button className={styles.loginButton} onClick={() => navigate("/")}>
        Log in
      </button>
    </div>
  );
};

export default Register;
