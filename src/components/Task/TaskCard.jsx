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
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css";

const TaskCard = ({ task, isAllChecklistsCollapsed, onIndividualCollapse }) => {
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const { deleteTask, updateTaskColumn, updateTask } = useTaskContext();
  const popupMenuRef = useRef(null);
  const [isChecklistCollapsed, setIsChecklistCollapsed] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    setIsChecklistCollapsed(isAllChecklistsCollapsed);
  }, [isAllChecklistsCollapsed]);

  const handleCollapseToggle = () => {
    setIsChecklistCollapsed(!isChecklistCollapsed);
    onIndividualCollapse(); // Call the callback function to update the global collapse state
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

  //popupmenu
  const openPopupMenu = () => {
    setIsPopupMenuOpen(true);
  };

  const closePopupMenu = () => {
    setIsPopupMenuOpen(false);
  };

  const openDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(true);
    closePopupMenu();
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  //delete task
  const handleDelete = async () => {
    await deleteTask(task._id);
    closeDeleteConfirmation();
    toast.success("Task Deleted", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  //column update
  const handleColumnUpdate = async (column) => {
    try {
      await updateTaskColumn(task._id, { column });
    } catch (error) {
      console.error("Error updating task column state:", error);
    }
  };

  //edit
  const handleEdit = () => {
    setIsEditModalOpen(true);
    setEditedTask(task);
  };

  // Function to handle saving the edited task
  const handleSaveEdit = async (updatedTaskData) => {
    try {
      await updateTask(task._id, updatedTaskData);
      setIsEditModalOpen(false);
      setEditedTask(updatedTaskData); // Update editedTask with the edited data
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleShare = () => {
    const taskLink = generateTaskLink(task._id); // Generate link for the task
    copyToClipboard(taskLink);
    console.log(taskLink);
    // Show toast message
    toast.success("Link copied", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const generateTaskLink = (taskId) => {
    // Replace 'yourwebsite.com' with your actual website domain
    return ` http://localhost:5173/task/${taskId}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  //checkbox editable
  const handleCheckboxChange = (index) => {
    const updatedChecklist = [...task.checklist];
    updatedChecklist[index].done = !updatedChecklist[index].done;
    const updatedTask = { ...task, checklist: updatedChecklist };
    setEditedTask(updatedTask); // Update editedTask state for UI rendering
    // Update task state directly to persist the changes
    updateTask(task._id, updatedTask).catch((error) => {
      console.error("Error updating task:", error);
      // If there's an error, revert the UI state to the previous state
      setEditedTask(task);
    });
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

  //dudate
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero for accurate date comparison

  const isDueDatePassed = new Date(task.dueDate) < currentDate;

  const isTaskCompleted = task.column === "DONE";

  const getDateButtonStyle = () => {
    if (isTaskCompleted) {
      return { backgroundColor: "#63C05B", color: "#fff" }; // Completed tasks have this style
    } else if (isDueDatePassed) {
      return { backgroundColor: "#CF3636", color: "#fff" }; // Overdue tasks have this style
    } else {
      return {}; // Default style for other cases
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
                onEdit={handleEdit}
                onDelete={openDeleteConfirmation}
                onShare={handleShare}
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
          {isChecklistCollapsed || isAllChecklistsCollapsed ? (
            <img src={collapseup} alt="Collapse" />
          ) : (
            <img src={collapsedown} alt="Expand" />
          )}
        </div>
      </div>
      <div className={styles.checklist}>
        {!isChecklistCollapsed &&
          !isAllChecklistsCollapsed &&
          task.checklist.map((item, index) => (
            <div key={index} className={styles.checklistItem}>
              <input
                type="checkbox"
                checked={item.done}
                className={styles.checkbox}
                onChange={() => handleCheckboxChange(index)}
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
          task={editedTask} // Pass the edited task data to the modal
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
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
