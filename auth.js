const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get User by Email
      const user = await User.findOne({ email });

      // Match the Password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          resolve(user);
        } else {
          //  Pass didnt match
          reject("Authentification failed");
        }
      });
    } catch (err) {
      // Email not found
      reject("Authentication failed");
    }
  });
};
