// Store authentication data in local storage after successful login
export const storeAuthData = (authResponse) => {
  localStorage.setItem('accessToken', authResponse.accessToken);
  localStorage.setItem('refreshToken', authResponse.refreshToken);
  localStorage.setItem('user', JSON.stringify(authResponse.user));
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken; 
};

// Get the current user's information from local storage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Logout the user by clearing authentication data from local storage
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');

};