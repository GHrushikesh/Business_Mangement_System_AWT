// Central API configuration
// This automatically detects if we are running locally or on Vercel
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5555/api' // Local Backend
  : '/api';                     // Vercel Backend (relative path)

export default API_BASE_URL;
