const bcrypt = require('bcrypt');

const { addUser } = require('../models/userModel')
const { addUserRole } = require('../models/userRoleModel')

const handleNewUser = async (req, res) => {
    const {fName, lName, email, password} = req.body
    if (!email || !password || !fName || ! lName) return res.status(400).json({'message': 'All fields required'})
    const hashPassword = await bcrypt.hash(password, 10)
    addUser(email,fName, lName, hashPassword).then(() => {
      addUserRole(email, 3).then(() => {
        res.status(201).json({'success': `New user ${email} created!`})
      }).catch((err) => {
        console.log(err)
        res.status(500).json({ "message": err.message })
      })
    }).catch((err) => {
      console.log(err)
      if (err.code === 'ER_DUP_ENTRY') {
        res.sendStatus(409)
      }
      res.status(500).json({"message": err.message}) 
    })
}

module.exports = { handleNewUser }