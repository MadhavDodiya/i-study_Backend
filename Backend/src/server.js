const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is missing in environment variables');
  process.exit(1);
}

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
  console.error('Server error:', error);
  process.exit(1);
});

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

startServer();

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
