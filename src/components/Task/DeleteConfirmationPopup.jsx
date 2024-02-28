import React from "react";
import styles from "./DeleteConfirmationPopup.module.css";

const DeleteConfirmationPopup = ({ onDelete, onClose }) => {
  return (
    <div className={styles.overlay} >
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupContent}>
          <p>Are you sure you want to delete?</p>
          <div className={styles.buttons}>
            <button
              onClick={() => {
                onDelete();
                onClose();
              }}
              style={{ backgroundColor: "#17A2B8", color: "white" }}
            >
              Yes, Delete
            </button>
            <button
              onClick={onClose}
              style={{ border: "1px solid #CF3636", color: "#CF3636", background: "transparent" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
