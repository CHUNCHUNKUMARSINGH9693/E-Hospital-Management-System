const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: String,
  recipient: String,
  message: String,
});

module.exports = mongoose.model('Message', messageSchema);
