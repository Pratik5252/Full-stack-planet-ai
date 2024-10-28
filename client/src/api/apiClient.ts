import axios from "axios";

// Base URL connection to the backend
const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
