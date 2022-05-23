const jwt = require('jsonwebtoken');
const db = require('../dbcon')
require('dotenv').config()

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt

    inserts = [refreshToken];
	sql_refresh_user = "SELECT * FROM users WHERE jwtToken = ?;";

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
            const accessToken = jwt.sign(
                {"email": decoded.email},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            )
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken };
