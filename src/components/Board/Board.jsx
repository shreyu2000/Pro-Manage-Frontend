import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../../apis/userApi';
import styles from './Board.module.css';
import FilterOptions from '../Filter/FilterOptions';
import TaskColumn from '../Task/TaskColumn';
import { getAllTasks} from '../../apis/taskApi'; // Import the task API functions

const Board = () => {
  const [name, setName] = useState('User');
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('thisWeek');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [loading, setLoading] = useState(false); // State to indicate loading state

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
    const fetchTasks = async () => {
      setLoading(true); // Set loading to true before fetching tasks
      try {
        const tasksData = await getAllTasks();
        setTasks(tasksData.data); // Update tasks state with fetched tasks
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks');
      }
    };
    fetchTasks();
  }, [tasks]);

  const handleFilter = (selectedFilter) => {
    setSelectedFilter(selectedFilter);
    setShowFilterOptions(false); // Close the popup after selecting an option
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  // Filter tasks based on the selected column
  const backlogTasks = tasks.filter(task => task.column === 'BACKLOG');
  const todoTasks = tasks.filter(task => task.column === 'TO-DO');
  const inProgressTasks = tasks.filter(task => task.column === 'PROGRESS');
  const doneTasks = tasks.filter(task => task.column === 'DONE');

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
        {/* Render TaskColumns with filtered tasks */}
        <TaskColumn title="Backlog" tasks={backlogTasks} />
        <TaskColumn title="To do" tasks={todoTasks} isToDo={true} />
        <TaskColumn title="In progress" tasks={inProgressTasks} />
        <TaskColumn title="Done" tasks={doneTasks} />
      </div>
      {loading && <div>Loading...</div>} 
      {error && <div>Error: {error}</div>} {/* Render error message */}
    </div>
  );
};

export default Board;
