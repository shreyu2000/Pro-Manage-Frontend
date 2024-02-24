import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/tasks';

// Create a new task
const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}`, taskData);
    return response.data;
  } catch (error) {
    console.log('Error creating task:', error);
    throw error.response.data.message || 'Failed to create task';
  }
};

// Get all tasks for a user
const getAllTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error.response.data.message || 'Failed to fetch tasks';
  }
};

// Update a task
const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error.response.data.message || 'Failed to update task';
  }
};

// Delete a task
const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error.response.data.message || 'Failed to delete task';
  }
};

// Update column state of a task
const updateTaskColumn = async (taskId, columnData) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}/column`, columnData);
    return response.data;
  } catch (error) {
    console.error('Error updating task column state:', error);
    throw error.response.data.message || 'Failed to update task column state';
  }
};

export { createTask, getAllTasks, updateTask, deleteTask, updateTaskColumn };
