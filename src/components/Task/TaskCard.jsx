import React, { useState } from "react";
import styles from "./TaskCard.module.css"; // Import CSS for styling
import arrowup from "../../assets/icons/arrowup.svg";
import arrowdown from "../../assets/icons/arrowdown.svg";
import { useTaskContext } from "../../utils/taskContext"; // Import the useTaskContext hook
import { formatDate } from "../../utils/DateFormat";


const PopupMenu = ({ onEdit, onDelete, onShare, onClose }) => {
  return (
    <div className={styles.popupMenu}>
      <div
        className={styles.option}
        onClick={() => {
          onEdit();
          onClose();
        }}
      >
        Edit
      </div>
      <div
        className={styles.option}
        onClick={() => {
          onDelete();
          onClose();
        }}
      >
        Delete
      </div>
      <div
        className={styles.option}
        onClick={() => {
          onShare();
          onClose();
        }}
      >
        Share
      </div>
    </div>
  );
};




const TaskCard = ({ task }) => {
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { updateTask, deleteTask, updateTaskColumn } = useTaskContext(); // Destructure updateTask, deleteTask, and updateTaskColumn functions

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const openPopupMenu = () => {
    setIsPopupMenuOpen(true);
  };

  const closePopupMenu = () => {
    setIsPopupMenuOpen(false);
  };

  const handleEdit = () => {
    // Implement edit functionality here
    // For example, you can open a modal for editing the task
  };

  const handleDelete = () => {
    // Call deleteTask function from the task context
    deleteTask(task._id);
  };

  const handleShare = () => {
    // Implement share functionality here
  };

  const handleColumnUpdate = async (column) => {
    try {
      await updateTaskColumn(task._id, { column });
    } catch (error) {
      console.error("Error updating column:", error);
      // Handle error
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#FF2473"; // High priority color
      case "Moderate":
        return "#18B0FF"; // Moderate priority color
      case "Low":
        return "#63C05B"; // Low priority color
      default:
        return "#000000"; // Default color (black) if priority is not recognized
    }
  };

  const priorityColor = getPriorityColor(task.priority); // Calculate priority color

  const formattedDate = formatDate(task.dueDate);

  return (
    <div className={styles.taskCard}>
      <div className={styles.header}>
        <div
          className={styles.priorityDot}
          style={{ backgroundColor: priorityColor }}
        ></div>
        <span>{task.priority}</span>
        {/* Popup menu */}
        {isPopupMenuOpen && (
          <PopupMenu
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShare={handleShare}
            onClose={closePopupMenu}
          />
        )}
        <div className={styles.popupMenuIcon} onClick={openPopupMenu}>
          ...
        </div>
      </div>
      {/* Task title */}
      <h2 className={styles.title}>{task.title}</h2>
      {/* Checklist status line */}
      <div className={styles.checklistStatus}>
        Checklist (
        {task.checklist.filter((item) => item.done).length}/{task.checklist.length}
        )
        <div className={styles.collapseIcon} onClick={handleCollapseToggle}>
          {isCollapsed ? (
            <img src={arrowup} alt="Collapse" />
          ) : (
            <img src={arrowdown} alt="Expand" />
          )}
        </div>
      </div>
      <div className={styles.checklist}>
        {task.checklist.map((item, index) => (
          <div key={index} className={styles.checklistItem}>
            <input type="checkbox" checked={item.done} />
            <span className={styles.checklistTitle}>{item.title}</span>
          </div>
        ))}
      </div>
      {/* Due Date */}
      <div className={styles.cardbottom}>
        <div className={styles.dueDate}>
          {task.dueDate && <button style={{ fontSize: "10px" }}>{formattedDate}</button>}
        </div>
        {/* Column buttons */}
        <div className={styles.columnButtons}>
          {["Backlog", "To Do", "In Progress", "Done"]
            .filter((columnName) => columnName !== task.column)
            .map((columnName) => (
              <button
                key={columnName}
                onClick={() => handleColumnUpdate(columnName)}
                className={styles.columnchips}
              >
                {columnName}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
