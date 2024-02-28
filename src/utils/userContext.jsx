import React, { createContext, useContext, useState } from 'react';
import { registerUser, loginUser, updateUserSettings, fetchUserData } from '../apis/userApi.js';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const register = async ({ name, email, password }) => {
    try {
      const response = await registerUser({ name, email, password });
      const { data } = response;
      if (data) {
        setUserData(data);
      } else {
        setError('Registration failed');
      }
      return response;
    } catch (error) {
      setError(error.message || 'Something went wrong during registration');
      return { data: null, error };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await loginUser({ email, password });
      const { data } = response;
      if (data) {
        setUserData(data);
      } else {
        setError('Login failed');
      }
      // console.log(response.data);
      return response.data;
    } catch (error) {
      setError(error.message || 'Something went wrong during login');
      return { data: null, error };
    }
  };

  const updateSettings = async ({ newName, oldPassword, newPassword }) => {
    try {
      const response = await updateUserSettings({ name: newName, oldPassword, newPassword });
      return response;
    } catch (error) {
      setError(error.message || 'Something went wrong while updating settings');
      return { data: null, error };
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetchUserData();
      const { data } = response;
      if (data) {
        setUserData(data);
      } else {
        setError('Failed to fetch user data');
      }
      return response;
    } catch (error) {
      setError(error.message || 'Something went wrong while fetching user data');
      return { data: null, error };
    }
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('accessToken');
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        error,
        register,
        login,
        updateSettings,
        fetchUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
