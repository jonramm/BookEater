const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../dbcon')
require('dotenv').config()

const handleLogin = async (req, res) => {
    console.log("Logging in...")
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

    inserts = [email];
	  sql_auth_user = "SELECT email, password, jwtToken, group_concat(ur.role) as roles FROM users JOIN user_roles ur ON email = ur.user WHERE email = ?;";

    const getUser = async () => {
      return new Promise((resolve, reject) => {
        db.query(sql_auth_user, inserts, (err, result) => {
          if(err) {
            console.log(err)
          } else {
            resolve(JSON.stringify(result))
          }
        })
      })  
    }
    foundUser = JSON.parse(await getUser())[0]
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
            { expiresIn: '5m' }
        );
        const refreshToken = jwt.sign(
            {"email": foundUser.email},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        inserts = [refreshToken, email]
        sql_insert_user = "UPDATE users SET jwtToken = ? WHERE email = ?;";
        db.query(sql_insert_user, inserts, (err, result) => {
            if(err) {
              console.log(err)
              res.status(500).json({"message": err.message}) 
            } else {
              // Creates Secure Cookie with refresh token
              res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
              // Send authorization roles and access token to user
              res.json({ roles, accessToken });
            }
          })
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };
