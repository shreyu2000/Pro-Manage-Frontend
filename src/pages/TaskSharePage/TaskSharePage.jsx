// TaskSharePage.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById } from "../../apis/taskApi"; // Import function to fetch task by ID
import TaskShare from "../../components/TaskShare/TaskShare.jsx"; // Import TaskCard component

const TaskSharePage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await getTaskById(taskId);
        console.log(taskData);
        setTask(taskData);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [taskId]);

  return (
    <div>
      {task && <TaskShare task={task} />} {/* Render TaskCard with fetched task data */}
    </div>
  );
};

export default TaskSharePage;
