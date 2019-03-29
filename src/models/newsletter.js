const mongoose = require('mongoose');

const NewsLetterSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
    },
    createdAt : {
      type: Date,
      default: Date.now,
    },
});

module.exports = mongoose.model("NewsLatter", NewsLetterSchema);
