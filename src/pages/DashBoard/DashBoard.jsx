import React, { useState } from "react";
import LeftSection from "../../components/LeftSection/LeftSection.jsx"; // Import the LeftSection component
import RightSection from "../../components/RightSection/RightSection.jsx"; // Import the RightSection component
import styles from "./Dashboard.module.css"; // Import the Dashboard CSS module
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeLink, setActiveLink] = useState("board"); // Default active link is 'board'
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State to control the logout confirmation popup
  const navigate = useNavigate();

  const handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // Clear authentication tokens or user data from localStorage
      localStorage.removeItem("accessToken");
      // Redirect the user to the login page or perform any other necessary actions
      navigate("/");
    }
  };

  const openLogoutPopup = () => {
    setShowLogoutPopup(true);
   
  };

  const closeLogoutPopup = () => {
    setShowLogoutPopup(false);
  };

  return (
    <div className={styles.dashboard}>
      <LeftSection
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        openLogoutPopup={openLogoutPopup}
      />
      <RightSection activeLink={activeLink} />
      {showLogoutPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <p>Are you sure you want to Logout?</p>
            <div className={styles.buttons}>
              <button
                onClick={() => {
                  handleLogout();
                  closeLogoutPopup();
                }}
                style={{ backgroundColor: "#17A2B8", color: "white" }}
              >
                Yes, Logout
              </button>
              <button
                onClick={closeLogoutPopup}
                style={{ border: "2px solid #CF3636", color: "#CF3636" ,background:"transparent" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
