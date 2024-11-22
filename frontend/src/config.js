// config.js
const CONFIG = {
    API_URL: process.env.NODE_ENV === 'production'
      ? 'http://52.79.138.214:8081'
      : 'http://localhost:8080',
  };
  
  export default CONFIG;