import React, { useEffect, useState, useRef  } from 'react';
import { fetchUserData } from '../../apis/userApi';
import styles from './Board.module.css';
import FilterOptions from '../Filter/FilterOptions';
import TaskColumn from '../Task/TaskColumn';
import { getTasksByFilter } from '../../apis/taskApi'; // Import the task API functions

const Board = () => {
  const [name, setName] = useState('User');
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('thisWeek');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [loading, setLoading] = useState(true); // State to indicate loading state

  const filterOptionsRef = useRef(null);

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
      try {
        const tasksData = await getTasksByFilter(selectedFilter);
        console.log(tasksData);
        setTasks(tasksData); // Update tasks state with fetched tasks
        setLoading(false); // Set loading to false after fetching tasks
      } catch (error) {
        console.error(`Error fetching tasks for filter '${selectedFilter}':`, error);
        setError('Failed to fetch tasks');
        setLoading(false); // Ensure loading state is set to false even if there's an error
      }
    };
    fetchTasks();
  }, [selectedFilter,tasks]); // Fetch tasks whenever the selected filter changes

  const handleFilter = (selectedFilter) => {
    setSelectedFilter(selectedFilter);
    setShowFilterOptions(false); // Close the popup after selecting an option
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const handleClickOutside = (event) => {
    if (filterOptionsRef.current && !filterOptionsRef.current.contains(event.target)) {
      setShowFilterOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <div className={styles.boardcontainer}>
      <div className={styles.top}>
        <div className={styles.boardheader}>
          <h2>Welcome ! {name}</h2>
          <p>{currentDate}</p>
        </div>
        <div className={styles.boardheading}>
          <h2>Board</h2>
          <div className={styles.filterContainer}  ref={filterOptionsRef}>
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
        <TaskColumn title="Backlog" tasks={tasks.filter(task => task.column === 'BACKLOG')} />
        <TaskColumn title="To do" tasks={tasks.filter(task => task.column === 'TO-DO')} isToDo={true} />
        <TaskColumn title="In progress" tasks={tasks.filter(task => task.column === 'PROGRESS')} />
        <TaskColumn title="Done" tasks={tasks.filter(task => task.column === 'DONE')} />
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>} {/* Render error message */}
    </div>
  );
};

export default Board;
