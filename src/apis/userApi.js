import axios from "axios";

// const backendUrl = import.meta.env.REACT_APP_BACKEND_URL;
const backendUrl= "http://localhost:4000"
// Register a new user
export const registerUser = async ({ name, email, password }) => {
    try {
        const response = await axios.post(`${backendUrl}/api/v1/users/register`, {
            name,
            email,
            password
        });

        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response?.data?.message || "Something went wrong." };
    }
};

// Login a user
export const loginUser = async ({ email, password }) => {
    try {
        const response = await axios.post(`${backendUrl}/api/v1/users/login`, {
            email,
            password
        });

        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response?.data?.message || "Something went wrong." };
    }
};

// Update user settings
export const updateUserSettings = async ({ newName, oldPassword, newPassword }) => {
    try {
        const response = await axios.put(`${backendUrl}/api/v1/users/settings`, {
            newName,
            oldPassword,
            newPassword
        });

        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response?.data?.message || "Something went wrong." };
    }
};

