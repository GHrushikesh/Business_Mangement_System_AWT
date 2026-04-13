// Central API configuration
const API_BASE_URL = (import.meta.env.MODE === 'development')
  ? 'http://localhost:5555/api' // In development (npm run dev)
  : '/api';                     // In production (Vercel)

export default API_BASE_URL;
