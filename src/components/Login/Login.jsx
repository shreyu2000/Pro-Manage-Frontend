import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useUserContext } from "../../utils/userContext"; // Import userContext without .jsx extension
import EmailIcon from '../../assets/icons/email.svg';
import lockIcon from '../../assets/icons/lock.svg'
import { toast } from "react-toastify"; // Import toast from react-toastify


const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useUserContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { email, password } = formData;
  //   try {
  //     // Call the loginUser function from the userContext
  //     const response = await login({ email, password });
  //     // If login is successful, redirect to home page
  //     console.log(response);
  //     if (response) {
  //       console.log("User Logged in ", response);
  //       navigate("/dashboard");
  //     }

  //   } catch (error) {
  //     // If login fails, set error message
  //     setError(error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      // Call the loginUser function from the userContext
     const response= await login({ email, password });
     console.log(response);
      // If login is successful, redirect to home page
      if(response.success){
        navigate("/dashboard");
      }
      else if(!response.data){
        toast.error(error || "Login failed");
      }
    } catch (error) {
      // If login fails, display toast message with the error
      toast.error(error || "Login failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit}>
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
      <button
        className={styles.registerButton}
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
};

export default Login;
