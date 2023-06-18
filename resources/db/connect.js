const mongoose = require('mongoose');
const debug = __debug('resources/db/connect');

function init() {
  const uri = __config('db/uri');

  mongoose.connect(uri);

  // Connection event listeners
  mongoose.connection.on('connected', () => {
    debug('Connected to MongoDB');
    // debug('Database: %s', mongoose.connection.db.databaseName);
  });

  mongoose.connection.on('error', (error) => {
    debug('MongoDB connection error:', error);
  });

  mongoose.connection.on('disconnected', () => {
    debug('Disconnected from MongoDB');
  });

  mongoose.connection.on('reconnected', () => {
    debug('Reconnected to MongoDB');
  });

  mongoose.connection.on('close', () => {
    debug('MongoDB connection closed');
  });

  // SIGINT event listener
  process.on('SIGINT', async () => {
    try {
      // Close the Mongoose connection
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0); // Exit the process with a success status code
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
      process.exit(1); // Exit the process with a failure status code
    }
  });

  return mongoose;
}

module.exports = { init };