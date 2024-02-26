import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import styles from './TaskColumn.module.css';
import collapseicon from '../../assets/icons/collapseall.svg';

const TaskColumn = ({ title, tasks, isToDo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllChecklistsCollapsed, setIsAllChecklistsCollapsed] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCollapseAll = () => {
    setIsAllChecklistsCollapsed(!isAllChecklistsCollapsed);
  };

  const handleIndividualCollapse = () => {
    setIsAllChecklistsCollapsed(false);
  };

  return (
    <div className={styles.taskColumn}>
      <div className={styles.columnHeader}>
        <h3>{title}</h3>
        {isToDo && <button onClick={openModal}>+</button>}
        <img
          src={collapseicon}
          alt="Collapse All"
          className={styles.collapseIcon}
          onClick={handleCollapseAll}
        />
      </div>
      <div className={styles.taskList}>
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            isAllChecklistsCollapsed={isAllChecklistsCollapsed}
            onIndividualCollapse={handleIndividualCollapse}
          />
        ))}
      </div>
      {isModalOpen && <TaskModal onClose={closeModal} />}
    </div>
  );
};

export default TaskColumn;
