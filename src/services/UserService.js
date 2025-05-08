import api from "./apiService";
import authService from "./authService";

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    authService.logout();

    window.location.href = '/login';
  }

  return Promise.reject(error);
});

const userService = {
  async getUsers() {
    const response = await api.get('/users');
    return response.data;
  },
  async createUser(userData) {
    await api.post('/users', userData);
  },
  async updateUser(id, userData) {
    await api.put(`/users/${id}`, userData);
  },
  async deleteUser(id) {
    await api.delete(`/users/${id}`);
  },
}

export default userService;
