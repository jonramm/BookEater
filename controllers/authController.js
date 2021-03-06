const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const { getUser, updateUserToken } = require('../models/userModel')

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });
    foundUser = JSON.parse(await getUser(email))[0]
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const rolesRaw = foundUser.roles 
        const roles = rolesRaw.split(',').map(str => {return Number(str)})
        const accessToken = jwt.sign(
          {
            "UserInfo":
            { "email": foundUser.email,
              "roles": roles}
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            {"email": foundUser.email},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '2d' }
        );
        // Saving refreshToken with current user
        updateUserToken(email, refreshToken).then(() => {
          // Creates Secure Cookie with refresh token
          res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
          // res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          // Send authorization roles and access token to user
          res.json({ roles, accessToken });
        }).catch((err) => {
          console.log(err)
          res.status(500).json({"message": err.message}) 
        })
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };
