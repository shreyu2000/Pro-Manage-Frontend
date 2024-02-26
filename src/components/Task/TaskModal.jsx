import React, { useState } from "react";
import styles from "./TaskModal.module.css"; // Import CSS file for styling
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import deleteicon from "../../assets/icons/Delete.svg";
import { useTaskContext } from "../../utils/taskContext"; // Import useTaskContext hook

const TaskModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [checklist, setChecklist] = useState([]);
  const [checkedChecklist, setCheckedChecklist] = useState([]);
  const { createTask } = useTaskContext(); // Use the createTask function from the TaskContext

  const handleAddChecklistItem = () => {
    setChecklist([...checklist, ""]);
    setCheckedChecklist([...checkedChecklist, false]); // Add a corresponding entry in checkedChecklist
  };

  const handleDeleteChecklistItem = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist.splice(index, 1);
    setChecklist(updatedChecklist);
    const updatedCheckedChecklist = [...checkedChecklist];
    updatedCheckedChecklist.splice(index, 1);
    setCheckedChecklist(updatedCheckedChecklist);
  };

  const handleCheckItem = (index) => {
    const updatedCheckedChecklist = [...checkedChecklist];
    updatedCheckedChecklist[index] = !updatedCheckedChecklist[index];
    setCheckedChecklist(updatedCheckedChecklist);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create task object with input values
    const taskData = {
      title,
      priority,
      dueDate,
      checklist: checklist.map((item, index) => ({
        title: item,
        done: checkedChecklist[index],
      })),
    };

    console.log("Submitting taskData:", taskData); // Log the taskData object

    try {
      // Call createTask function from TaskContext to save the task
      await createTask(taskData);
      onClose(); // Close the modal after creating the task
    } catch (error) {
      console.error("Error creating task:", error);
      // Handle error
    }
  };

  const handleSetPriority = (priority) => {
    setPriority(priority.toUpperCase());
  };
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <form onSubmit={handleSubmit}>
          {/* Input fields for task details */}
          <div className={styles.formGroupTitle}>
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              placeholder="Enter Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroupPriority}>
            <label htmlFor="priority">Select Priority* </label>
            <div className={styles.priorityContainer}>
              <div
                className={`${styles.priorityOption} ${
                  priority === "HIGH" ? styles.selected : ""
                }`}
                onClick={() => handleSetPriority("HIGH")}
              >
                <span
                  className={styles.priorityDot}
                  style={{ backgroundColor: "#FF2473" }}
                ></span>{" "}
                HIGH PRIORITY
              </div>
              <div
                className={`${styles.priorityOption} ${
                  priority === "MODERATE" ? styles.selected : ""
                }`}
                onClick={() => handleSetPriority("MODERATE")}
              >
                <span
                  className={styles.priorityDot}
                  style={{ backgroundColor: "#18B0FF" }}
                ></span>{" "}
                MODERATE PRIORITY
              </div>
              <div
                className={`${styles.priorityOption} ${
                  priority === "LOW" ? styles.selected : ""
                }`}
                onClick={() => handleSetPriority("LOW")}
              >
                <span
                  className={styles.priorityDot}
                  style={{ backgroundColor: "#63C05B" }}
                ></span>{" "}
                LOW PRIORITY
              </div>
            </div>
          </div>
          {/* Checklist input fields */}
          <div className={styles.formGroupChecklist}>
            <label>
              Checklist({checkedChecklist.filter(Boolean).length}/
              {checklist.length})*
            </label>
            <div>
              {checklist.map((item, index) => (
                <li key={index} className={styles.checklistitems}>
                  <input
                    type="checkbox"
                    checked={checkedChecklist[index]}
                    onChange={() => handleCheckItem(index)}
                  />
                  <input
                    type="text"
                    placeholder="Add a task"
                    value={item}
                    onChange={(e) => {
                      const newList = [...checklist];
                      newList[index] = e.target.value;
                      setChecklist(newList);
                    }}
                  />
                  <span
                    className={styles.deleteIcon}
                    onClick={() => handleDeleteChecklistItem(index)}
                  >
                    <img src={deleteicon} alt="delete" />
                  </span>
                </li>
              ))}
            </div>
            {/* Add new checklist item */}
          </div>
          <button
            type="button"
            className={styles.addNew}
            onClick={handleAddChecklistItem}
          >
            + Add New
          </button>

          {/* Save and cancel buttons */}
          <div className={styles.modalButtons}>
            <div className={styles.calendarContainer}>
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select Due Date"
                className={styles.datePicker}
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
