const jwt = require('jsonwebtoken');
const db = require('../dbcon')
require('dotenv').config()

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt

    inserts = [refreshToken];
	  sql_refresh_user = "SELECT email, password, jwtToken, group_concat(ur.role) as roles FROM users JOIN user_roles ur ON email = ur.user WHERE jwtToken = ?;";

    const getUser = async () => {
      return new Promise((resolve, reject) => {
        db.query(sql_refresh_user, inserts, (err, result) => {
          if(err) {
            console.log(err)
          } else {
            resolve(JSON.stringify(result))
          }
        })
      })  
    }
    foundUser = JSON.parse(await getUser())[0]
    if (!foundUser) return res.sendStatus(403); //Forbidden
    // evaluate password 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403)
            const rolesRaw = foundUser.roles 
            const roles = rolesRaw.split(',').map(str => {return Number(str)})
            const accessToken = jwt.sign(
                {
                  "UserInfo": {
                    "email": decoded.email,
                    "roles": roles
                  }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            )
            res.json({ roles, accessToken })
        }
    )
}

module.exports = { handleRefreshToken };
