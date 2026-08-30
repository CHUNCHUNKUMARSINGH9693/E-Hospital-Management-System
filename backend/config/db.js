```js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Ehospital';
    if (!connUri) {
      throw new Error('MONGODB_URI is not defined');
    }

    await mongoose.connect(connUri);

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```
