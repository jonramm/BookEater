const db = require('../dbcon')
const { getUserByToken, updateUserInfo } = require('../models/userModel')

const getAllUsers = async (req, res) => {
  db.query("SELECT email FROM users;", (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({ "message": err.message })
    }
    res.json(result)
  })
}

const createNewUser = (fName, lName, email, hashPassword) => {
  inserts = [fName, lName, email, hashPassword]
  sql_insert_user = "INSERT INTO users (fName, lName, email, password) VALUES (?,?,?,?)";
  db.query(sql_insert_user, inserts, (err, res) => {
    if (err) {
      console.log(err)
      if (err.code === 'ER_DUP_ENTRY') {
        res.sendStatus(409)
      }
      res.status(500).json({ "message": err.message })
    } else {
      res.status(201).json({ 'success': `New user ${email} created!` })
    }
  })
}

const addUserRole = async (req, res) => {
  inserts = [req.body.user, req.body.role]
  sql_insert_user_role = "INSERT INTO user_roles (user, role) VALUES (?,?);"
  db.query(sql_insert_user_role, inserts, (err, res) => {
    if (err) {
      console.log(err)
      res.status(406).json({ 'error': 'role assignment failed' })
    } else {
      //   db.query(`INSERT INTO user_roles (user, role) VALUES ("${email}", 1);`)
      res.status(201).json({'success': `New user ${email} created!`})
    }
  })
}

const getUser = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt
  try {
    console.log('Getting user info with jwt token...')
    const user = await getUserByToken(refreshToken)
    res.status(200).json(user)
  } catch(err) {
    console.log(err)
    res.status(500).json({ "message": err })
  }
}

const updateUser = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt
  try {
    console.log('Updating user info...')
    updateUserInfo(refreshToken, req.body.fName, req.body.lName, req.body.location, req.body.bookstore, req.body.favBook, req.body.quote).then(() => {
      res.status(200).json({"message": "User info updated!"})
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({ "message": err })
  }
}

module.exports = {
  getAllUsers,
  createNewUser,
  addUserRole,
  getUser,
  updateUser
}