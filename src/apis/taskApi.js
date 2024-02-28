import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/tasks';

// Function to retrieve access token from localStorage
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Create a new task
const createTask = async (taskData) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.post(`${API_URL}`, taskData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error creating task:', error);
    throw error.response.data.message || 'Failed to create task';
  }
};

// Get all tasks for a user
const getAllTasks = async () => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error.response.data.message || 'Failed to fetch tasks';
  }
};

// Get a task by ID
const getTaskById = async (taskId) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data?.data;
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    throw error.response.data.message || 'Failed to fetch task by ID';
  }
};


// Update a task
const updateTask = async (taskId, taskData) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error.response.data.message || 'Failed to update task';
  }
};

// Delete a task
const deleteTask = async (taskId) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.delete(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error.response.data.message || 'Failed to delete task';
  }
};

// Update column state of a task
const updateTaskColumn = async (taskId, columnData) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.put(`${API_URL}/${taskId}/column`, columnData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating task column state:', error);
    throw error.response.data.message || 'Failed to update task column state';
  }
};

// Get tasks filtered by creation date
const   getTasksByFilter = async (filter) => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(`${API_URL}/filter/${filter}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log(response);
    return response.data?.data;
  } catch (error) {
    console.error('Error fetching tasks by Filter:', error);
    throw error.response.data.message || 'Failed to fetch tasks by Filter';
  }
};

export { createTask, getAllTasks, getTaskById, updateTask, deleteTask, updateTaskColumn ,  getTasksByFilter };
