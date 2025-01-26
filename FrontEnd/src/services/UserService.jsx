import axios from 'axios';

const API_URL = 'http://localhost:9080/api/users';

// Create an Axios instance with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the access token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Check if the token is in a valid JWT format
      if (token.split('.').length === 3) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.error('Invalid JWT format');
        throw new Error('Invalid JWT format');
      }
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
        console.error(error);
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
          throw new Error('Wrong username, password or account is deactivated');
        }

        // Save access and refresh tokens in localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));

        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error.response?.data?.message || 'Login failed');
      });
  }

  // Get all users
  getAllUsers() {
    return axiosInstance
      .get('/')
      .then((response) => {
        return response.data; // Return the data
      })
      .catch((error) => {
        console.error(error.message || error); // Log the error for debugging
        throw new Error(error.response?.data?.message || 'Failed to fetch users');
      });
  }
  

  // Get user by ID
  getUserById(id) {
    return axiosInstance
      .get(`/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error(error.response?.data?.message || 'Failed to fetch user');
      });
  }

  // Update user details
 // Update user details
updateUser(id, userData) {
  const token = localStorage.getItem('accessToken'); // Retrieve the token for debugging
  console.log('Debug Info:');
  console.log('User ID to Update:', id);
  console.log('User Data:', userData);
  console.log('Authorization Token:', token);

  return axiosInstance
    .put(`/${id}`, userData)
    .then((response) => {
      console.log('Response from Backend:', response.data);
      return response.data; // Return the response data to the caller
    })
    .catch((error) => {
      console.error('Error from Backend:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to update user');
    });
}


  // Delete user by ID
  deleteUser(id) {
    return axiosInstance
      .delete(`/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error(error.response?.data?.message || 'Failed to delete user');
      });
  }
}

export default new UserService();
