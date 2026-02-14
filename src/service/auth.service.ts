class AuthService {
  getCurrentUser(): { id: number; username: string; email: string; roles: string[]; accessToken: string } | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export default new AuthService();
