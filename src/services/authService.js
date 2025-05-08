import axios from "axios";

const authService = {
  async login(email, password) {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
      email,
      password,
    });

    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = '/';
  }
}

export default authService;
