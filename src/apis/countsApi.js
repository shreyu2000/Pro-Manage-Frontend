import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/analytics';

// Function to retrieve access token from localStorage
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Get all counts
const getAllCounts = async () => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(`${API_URL}/counts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data?.data;

  } catch (error) {
    console.error('Error fetching counts:', error);
    throw error.response.data.message || 'Failed to fetch counts';
  }
};

export { getAllCounts };
