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
    document.body.style.overflow = "hidden"; // Disable scrolling while the overlay is open
  };

  const closeLogoutPopup = () => {
    setShowLogoutPopup(false);
    document.body.style.overflow = ""; // Enable scrolling when the overlay is closed
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {
    // Do not close the popup when clicking outside of it
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
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.popup} onClick={stopPropagation}>
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
                  style={{ border: "1px solid #CF3636", color: "#CF3636", background: "transparent" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
