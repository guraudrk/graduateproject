// config.js
const CONFIG = {
    API_URL: process.env.NODE_ENV === 'production'
      ? 'http://54.180.244.4:8081'
      : 'http://localhost:8080',
  };
  
  export default CONFIG;