// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection string
    const mongoURI = 'mongodb://localhost:27017/getdelivered';

    // Options to pass to MongoDB driver during connection
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Connect to MongoDB
    await mongoose.connect(mongoURI, options);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectDB;
