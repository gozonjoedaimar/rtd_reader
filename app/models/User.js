const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    "username": String,
    "password": String, // md5 hashed
  },{
    methods: {
      verify: function(password) {
        password = crypto.createHash('md5').update(password).digest('hex');
        return this.password === password ? true: false;
      }
    }
  }
);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;