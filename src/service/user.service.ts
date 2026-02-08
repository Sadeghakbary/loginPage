import axios from 'axios';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/test/';

// Mock data for development without backend
const MOCK_DATA = {
  publicContent: "Welcome to the application! This is public content available to all users.",
  userContent: "User Board: You can access user-specific content here.",
  moderatorContent: "Moderator Board: You have moderator privileges.",
  adminContent: "Admin Board: You have full administrator privileges."
};

interface ApiResponse<T> {
  data: T;
}

class UserService {
  async getPublicContent(): Promise<ApiResponse<string>> {
    // Return mock data instead of API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: MOCK_DATA.publicContent };
    // Uncomment below for real API calls:
    // return axios.get(API_URL + 'all');
  }

  async getUserBoard(): Promise<ApiResponse<string>> {
    // Return mock data instead of API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: MOCK_DATA.userContent };
    // Uncomment below for real API calls:
    // return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  async getModeratorBoard(): Promise<ApiResponse<string>> {
    // Return mock data instead of API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: MOCK_DATA.moderatorContent };
    // Uncomment below for real API calls:
    // return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  async getAdminBoard(): Promise<ApiResponse<string>> {
    // Return mock data instead of API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: MOCK_DATA.adminContent };
    // Uncomment below for real API calls:
    // return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
