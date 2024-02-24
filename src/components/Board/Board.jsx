import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../../apis/userApi';
import styles from './Board.module.css';
import FilterOptions from '../Filter/FilterOptions';
import TaskColumn from '../Task/TaskColumn';
import { getAllTasks, createTask } from '../../apis/taskApi'; // Import the task API functions

const Board = () => {
  const [name, setName] = useState('User');
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('thisWeek');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [tasks, setTasks] = useState([]); // State to store tasks

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const userData = await fetchUserData();
        setName(userData.name);
      } catch (error) {
        setError('Failed to fetch user data');
      }
    };
    fetchUserSettings();

    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    // Fetch tasks when component mounts
    const fetchTasks = async () => {
      try {
        const tasksData = await getAllTasks();
        setTasks(tasksData.data); // Update tasks state with fetched tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks');
      }
    };
    fetchTasks();
  }, []);

  const handleFilter = (selectedFilter) => {
    // Call backend API to filter data based on the selected filter
    // Example: fetchTasks(selectedFilter);
    console.log('Filter selected:', selectedFilter);
    setSelectedFilter(selectedFilter);
    setShowFilterOptions(false); // Close the popup after selecting an option
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const handleSaveTask = async (taskData) => {
    try {
      await createTask(taskData);
      // After saving the task, update the tasks list by fetching them again
      const updatedTasksData = await getAllTasks();
      setTasks(updatedTasksData.data);
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle error
    }
  };

  return (
    <div className={styles.boardcontainer}>
      <div className={styles.top}>
        <div className={styles.boardheader}>
          <h2>Welcome ! {name}</h2>
          <p>{currentDate}</p>
        </div>
        <div className={styles.boardheading}>
          <h2>Board</h2>
          <div className={styles.filterContainer}>
            <button className={styles.filterButton} onClick={toggleFilterOptions}>
              {selectedFilter === 'today' ? 'Today' : selectedFilter === 'thisWeek' ? 'This Week' : 'This Month'}
              <span className={styles.arrowDown}></span>
            </button>
            {showFilterOptions && <FilterOptions onFilter={handleFilter} selectedFilter={selectedFilter} />}
          </div>
        </div>
      </div>
      <div className={styles.columncontainer}>
        <TaskColumn title="Backlog" tasks={tasks.filter(task => task.column === 'Backlog')} />
        <TaskColumn title="To Do" tasks={tasks.filter(task => task.column === 'To Do')} createTask={handleSaveTask} isToDo={true} />
        <TaskColumn title="In Progress" tasks={tasks.filter(task => task.column === 'In Progress')} />
        <TaskColumn title="Done" tasks={tasks.filter(task => task.column === 'Done')} />
      </div>
    </div>
  );
};

export default Board;
