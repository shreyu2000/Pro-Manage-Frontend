import React, { createContext, useContext, useEffect } from 'react';
import {
  createTask as apiCreateTask,
  getAllTasks as apiGetAllTasks,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
  updateTaskColumn as apiUpdateTaskColumn,
} from '../apis/taskApi.js' // Import your task API functions

// Create a context for task-related functions
const TaskContext = createContext();

// Custom hook to consume the task context
export const useTaskContext = () => useContext(TaskContext);

// Task provider component
export const TaskProvider = ({ children }) => {
  // Define functions to be exposed through the context
  const createTask = async (taskData) => {
    try {
      return await apiCreateTask(taskData);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  const getAllTasks = async () => {
    try {
      return await apiGetAllTasks();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  };
  

  const updateTask = async (taskId, taskData) => {
    try {
      return await apiUpdateTask(taskId, taskData);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      return await apiDeleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  const updateTaskColumn = async (taskId, columnData) => {
    try {
      return await apiUpdateTaskColumn(taskId, columnData);
    } catch (error) {
      console.error('Error updating task column state:', error);
      throw error;
    }
  };

  useEffect
  // Define the value of the context
  const value = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    updateTaskColumn,
  };

  // Provide the context value to children components
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
