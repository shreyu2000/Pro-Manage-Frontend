import React, { useState, useEffect } from "react";
import styles from "./Analytics.module.css";
import { getAllCounts } from "../../apis/countsApi.js"; // Update the path accordingly

const Analytics = () => {
  const [counts, setCounts] = useState({
    backlog: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
    lowPriority: 0,
    moderatePriority: 0,
    highPriority: 0,
    dueDate: 0,
  });

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const fetchData = async () => {
    try {
      const countsData = await getAllCounts(); // Fetch counts data
      setCounts(countsData); // Update state with fetched counts
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  return (
    <div className={styles.analyticscontainer}>
      <h2 className={styles.heading}>Analytics</h2>
      <div className={styles.countscontainer}>
        <div className={styles.countlists}>
          <ul>
            <li>
              <span>Backlog Tasks</span>
              <span><b>{counts.backlog}</b></span>
            </li>
            <li>
              <span>To-do Tasks</span>
              <span><b>{counts.todo}</b></span>
            </li>
            <li>
              <span>In-Progress Tasks</span>
              <span><b>{counts.inProgress}</b></span>
            </li>
            <li>
              <span>Completed Tasks</span>
              <span><b>{counts.completed}</b></span>
            </li>
          </ul>
        </div>
        <div className={styles.countlists}>
          <ul>
            <li>
              <span>Low Priority</span>
              <span><b>{counts.completed}</b></span>
            </li>
            <li>
              <span>Moderate Priority</span>
              <span><b>{counts.moderatePriority}</b></span>
            </li>
            <li>
              <span>High Priority</span>
              <span><b>{counts.highPriority}</b></span>
            </li>
            <li>
              <span>Due Date Tasks</span>
              <span><b>{counts.dueDate}</b></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

