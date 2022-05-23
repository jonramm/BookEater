const db = require('../dbcon')
const path = require('path')
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) return res.status(400).json({'message': 'Email and password required'})
    const hashPassword = await bcrypt.hash(password, 10)
    inserts = [email, hashPassword]
    sql_insert_user = "INSERT INTO users (email, password) VALUES (?,?)";
    db.query(sql_insert_user, inserts, (err, result) => {
        if(err) {
          console.log(err)
          if (err.code === 'ER_DUP_ENTRY') {
            res.sendStatus(409)
          }
          res.status(500).json({"message": err.message}) 
        } else {
        res.status(201).json({'success': `New user ${email} created!`})
        }
      })
}

module.exports = { handleNewUser }