import axios from "axios";

const backendUrl = "http://localhost:4000";

// Register a new user
export const registerUser = async ({ name, email, password }) => {
    try {
        const response = await axios.post(`${backendUrl}/api/v1/users/register`, {
            name,
            email,
            password
        });
        
        // Extract the token from the response
        // console.log(response.data.data.token); // Log the entire response data
        const { token } = response.data.data;
        // Store the token in localStorage
        localStorage.setItem('accessToken', token);

        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response?.data?.data?.message || "Something went wrong." };
    }
};

// Login a user
export const loginUser = async ({ email, password }) => {
    try {
        const response = await axios.post(`${backendUrl}/api/v1/users/login`, {
            email,
            password
        });

        // console.log(response.data); // Log the entire response data
        // console.log(response.data.data.token); // Log the token directly

        // Extract the token from the response
        const { token } = response.data.data;

        // Store the token in localStorage
        localStorage.setItem('accessToken', token);

        return { data: response.data , error: null };
    } catch (error) {
        console.error('Login error:', error); // Log any login errors
        return { data: null, error: error.response?.data?.message || "Something went wrong." };
    }
};
// Update user settings
export const updateUserSettings = async ({ newName, oldPassword, newPassword }) => {
    try {
        const token = localStorage.getItem('accessToken'); // Get the access token from localStorage    
        const response = await axios.put(`${backendUrl}/api/v1/users/settings`, {
            newName,
            oldPassword,
            newPassword
        }, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        });

        return response.data?.data
    } catch (error) {
        return { data: null, error: error.response?.data?.message || "Something went wrong." };
    }
};

// Fetch user data
export const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('accessToken'); // Get the access token from localStorage
        // console.log(token);
        
        const response = await axios.get(`${backendUrl}/api/v1/users/user`, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        });

        return response.data?.data
    } catch (error) {
        return { data: null, error: error.response?.data?.message || "Something went wrong." };
    }
};
