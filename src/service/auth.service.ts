import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/auth/";

class AuthService {
  getCurrentUser(): { id: number; username: string; email: string; roles: string[]; accessToken: string } | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export default new AuthService();
