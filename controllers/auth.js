const { response } = require("express");
const { getUser } = require('./getUser')
const { generateAccessToken } = require('./tokenGenerator')

const login = async (req, res = response) => {
  const { userName, password } = req.body;
  // Ideally search the user in a database and validate password, throw an error if not found.
  const user = getUser({ userName, password });
  
  if (user) {
    const token = generateAccessToken(user?.userName);
    res.json({
      token: `Bearer ${token}`,
      id: user?.id
    });
  } else res.sendStatus(401);
};

module.exports = {
    login,
  };
