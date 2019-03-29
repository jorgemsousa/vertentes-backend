const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      require: true,
      lowercase: true
    },
    password: {
      type: String,
      require: true,
      select: false
    },
    createdAt : {
      type: Date,
      default: Date.now
    },
});

UserSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next(); 
});

module.exports = mongoose.model("User", UserSchema);