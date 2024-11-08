const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  balance: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Wallet', walletSchema);
