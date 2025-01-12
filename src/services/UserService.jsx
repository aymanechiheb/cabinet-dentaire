import axios from 'axios';

const API_URL = 'http://localhost:8086/api/users';

// Create an Axios instance with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the access token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class UserService {
  // Register user
  register(userData) {
    return axiosInstance
      .post('/register', userData)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.response?.data?.message || 'Registration failed');
      });
  }

  // Login user and store tokens in localStorage
  login(userData) {
    return axiosInstance
      .post('/login', userData)
      .then((response) => {
        const { accessToken, refreshToken, user } = response.data;

        if (!accessToken || !refreshToken || !user) {
          throw new Error('Invalid response from server');
        }

        // Save access and refresh tokens in localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));

        return response.data;
      })
      .catch((error) => {
        throw new Error(error.response?.data?.message || 'Login failed');
      });
  }

  // Get all users
  getAllUsers() {
    return axiosInstance
      .get('/')
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.response?.data?.message || 'Failed to fetch users');
      });
  }

  // Get user by ID
  getUserById(id) {
    return axiosInstance
      .get(`/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.response?.data?.message || 'Failed to fetch user');
      });
  }

  // Update user details
  updateUser(id, userData) {
    return axiosInstance
      .put(`/${id}`, userData)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.response?.data?.message || 'Failed to update user');
      });
  }

  // Delete user by ID
  deleteUser(id) {
    return axiosInstance
      .delete(`/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.response?.data?.message || 'Failed to delete user');
      });
  }
}

export default new UserService();