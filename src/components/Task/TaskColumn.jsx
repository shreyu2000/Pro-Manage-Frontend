import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal'; // Assuming you have a TaskModal component
import styles from './TaskColumn.module.css';
import collapseicon from '../../assets/icons/collapseall.svg';

const TaskColumn = ({ title, tasks, isToDo, createTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCollapseAll = () => {
    // Add your logic to collapse all checklist items
  };

  return (
    <div className={styles.taskColumn}>
      <div className={styles.columnHeader}>
        <h3>{title}</h3>
        {/* Your collapse all icon */}
        {isToDo && <button onClick={openModal}>+</button>}
        <img
          src={collapseicon} // Assuming the path to your icon
          alt="Collapse All"
          className={styles.collapseIcon}
          onClick={handleCollapseAll}
        />
      </div>
      <div className={styles.taskList}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      {isModalOpen && <TaskModal onClose={closeModal} onSave={createTask} />}
    </div>
  );
};

export default TaskColumn;
