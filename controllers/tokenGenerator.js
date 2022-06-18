
const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.PRIVATE_KEY, { expiresIn: "1800s", });
}

module.exports = {
    generateAccessToken,
  };