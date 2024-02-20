// Dashboard.jsx
import React, { useState } from "react";
import LeftSection from "../../components/LeftSection/LeftSection.jsx"; // Import the LeftSection component
import RightSection from "../../components/RightSection/RightSection.jsx"; // Import the RightSection component
import styles from "./Dashboard.module.css"; // Import the Dashboard CSS module
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeLink, setActiveLink] = useState("board"); // Default active link is 'board'
  const navigate = useNavigate();

  const handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // Clear authentication tokens or user data from localStorage
      localStorage.removeItem("accessToken");
      // Redirect the user to the login page or perform any other necessary actions
      navigate('/')
    }
  };

  return (
    <div className={styles.dashboard}>
      <LeftSection
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        handleLogout={handleLogout}
      />
      <RightSection activeLink={activeLink} />
    </div>
  );
};

export default Dashboard;
