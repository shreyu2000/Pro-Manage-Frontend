import React, { useState, useEffect, useRef } from "react";
import styles from "./TaskCard.module.css"; // Import CSS for styling
import collapseup from "../../assets/icons/collapseup.svg";
import collapsedown from "../../assets/icons/collapsedown.svg";
import editIcon from "../../assets/icons/editicon.svg";
import { useTaskContext } from "../../utils/taskContext"; // Import the useTaskContext hook
import { formatDate } from "../../utils/DateFormat";
import TaskModal from "./TaskModal"; // Import the TaskModal component
import PopupMenu from "./PopupMenu.jsx";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup.jsx";

const TaskCard = ({ task }) => {
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const { deleteTask, updateTaskColumn, updateTask } = useTaskContext();
  const popupMenuRef = useRef(null);
  const [isChecklistCollapsed, setIsChecklistCollapsed] = useState(false);

  const handleCollapseToggle = () => {
    setIsChecklistCollapsed(!isChecklistCollapsed);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupMenuRef.current &&
        !popupMenuRef.current.contains(event.target)
      ) {
        closePopupMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openPopupMenu = () => {
    setIsPopupMenuOpen(true);
  };

  const closePopupMenu = () => {
    setIsPopupMenuOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
    closePopupMenu();
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(true);
    closePopupMenu();
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    closeDeleteConfirmation();
  };

  const handleColumnUpdate = async (column) => {
    try {
      await updateTaskColumn(task._id, { column });
    } catch (error) {
      console.error("Error updating task column state:", error);
    }
  };

  const handleEditTask = async (updatedTaskData) => {
    try {
      await updateTask(task._id, updatedTaskData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "#FF2473"; // High priority color
      case "MODERATE":
        return "#18B0FF"; // Moderate priority color
      case "LOW":
        return "#63C05B"; // Low priority color
      default:
        return "#000000"; // Default color (black) if priority is not recognized
    }
  };

  const isDueDatePassed = new Date(task.dueDate) < new Date();
  const isTaskCompleted = task.column === "DONE";

  const getDateButtonStyle = () => {
    if (isDueDatePassed) {
      return { backgroundColor: "#CF3636", color: "#fff" }; // Change color if due date has passed
    } else if (isTaskCompleted) {
      return { backgroundColor: "#63C05B", color: "#fff" }; // Change color if task is completed
    } else {
      return {}; // Default style
    }
  };

  const priorityColor = getPriorityColor(task.priority);
  const formattedDate = formatDate(task.dueDate);

  return (
    <div className={styles.taskCard}>
      <div className={styles.header}>
        <div
          className={styles.priorityDot}
          style={{ backgroundColor: priorityColor }}
        ></div>
        <span>{task.priority} PRIORITY</span>

        <div className={styles.popupMenuIcon} onClick={openPopupMenu}>
          <img src={editIcon} alt="Edit" />
          {isPopupMenuOpen && (
            <div ref={popupMenuRef}>
              <PopupMenu
                onEdit={openEditModal}
                onDelete={openDeleteConfirmation}
                onShare={() => {}}
                onClose={closePopupMenu}
              />
            </div>
          )}
        </div>
      </div>
      <h2 className={styles.title}>{task.title}</h2>
      <div className={styles.checklistStatus}>
        Checklist ({task.checklist.filter((item) => item.done).length}/
        {task.checklist.length})
        <div className={styles.collapseIcon} onClick={handleCollapseToggle}>
          {isChecklistCollapsed ? (
            <img src={collapseup} alt="Collapse" />
          ) : (
            <img src={collapsedown} alt="Expand" />
          )}
        </div>
      </div>
      <div className={styles.checklist}>
        {!isChecklistCollapsed &&
          task.checklist.map((item, index) => (
            <div key={index} className={styles.checklistItem}>
              <input
                type="checkbox"
                checked={item.done}
                className={styles.checkbox}
              />
              <span className={styles.checklistTitle}>{item.title}</span>
            </div>
          ))}
      </div>
      <div className={styles.cardbottom}>
        <div>
          {task.dueDate && (
            <button
              className={styles.formattedDate}
              style={getDateButtonStyle()}
            >
              {formattedDate}
            </button>
          )}
        </div>
        <div className={styles.columnButtons}>
          {["BACKLOG", "TO-DO", "PROGRESS", "DONE"]
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
      {isEditModalOpen && (
        <TaskModal
          task={task}
          onClose={closeEditModal}
          onSave={handleEditTask}
        />
      )}
      {isDeleteConfirmationOpen && (
        <DeleteConfirmationPopup
          onDelete={handleDelete}
          onClose={closeDeleteConfirmation}
        />
      )}
    </div>
  );
};

export default TaskCard;
