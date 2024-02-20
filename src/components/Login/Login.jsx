import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { loginUser } from "../../apis/userApi";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = formData;
  try {
    // Call the loginUser function from the API with an object containing email and password
    const { data } = await loginUser({ email, password });
    // If login is successful, redirect to home page
    if(data.success){
      console.log("User Logged in ", data);
    navigate("/dashboard");
    }
   
  } catch (error) {
    // If login fails, set error message
    setError(error.message);
  }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <FontAwesomeIcon icon={faLock} className={styles.icon} />
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
            icon={showPassword ? faEye : faEyeSlash}
            className={styles.eyeIcon}
            onClick={togglePasswordVisibility}
          />
        </div>
        <button type="submit" className={styles.button}>
          Log in
        </button>
      </form>
      <p className={styles.account}>Have no account yet?</p>
      <button className={styles.registerButton} onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
};

export default Login;
