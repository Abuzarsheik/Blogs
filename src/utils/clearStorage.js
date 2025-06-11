// Utility to clear potentially corrupted JWT tokens and localStorage
export const clearAuthStorage = () => {
  try {
    // Clear all auth-related items
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('blogToken');
    localStorage.removeItem('jwt');
    localStorage.removeItem('auth');
    
    // Clear any session storage as well
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('blogToken');
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('auth');
    
    console.log('Auth storage cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing auth storage:', error);
    return false;
  }
};

// Function to check if token is expired or invalid
export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    // Basic JWT structure check (header.payload.signature)
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Decode payload to check expiration
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Date.now() / 1000;
    
    return payload.exp > currentTime;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

// Clear storage on JWT errors
export const handleJWTError = () => {
  clearAuthStorage();
  // Redirect to login if needed
  if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
    window.location.href = '/login';
  }
};

// Utility to clear all localStorage data for the app
export const clearAppStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Clear any other app-specific data
  console.log('App storage cleared');
};

// Clear storage on app start if there are token issues
export const initializeApp = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Check if token is properly formatted
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.log('Invalid token format, clearing storage');
        clearAppStorage();
      }
    } catch (error) {
      console.log('Token validation error, clearing storage');
      clearAppStorage();
    }
  }
}; 