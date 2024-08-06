const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api/checkid', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
  app.use('/api/checkemail', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
  app.use('/api/signup', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
  app.use('/api/findid', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
  app.use('/api/findpassword', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
  app.use('/api/board/**',createProxyMiddleware({target:'http://localhost:8080',changeOrigin: true}));
  app.use('/api/currentUser',createProxyMiddleware({target:'http://localhost:8080',changeOrigin: true}));

};



