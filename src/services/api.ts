import axios from "axios";

// Replace with the actual backend API URL
const API_BASE_URL = "https://healthcare.googleapis.com";

// Fetch data from API
export const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error for proper handling
  }
};

// Post data to API (if needed)
export const postData = async (endpoint: string, data: object) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
