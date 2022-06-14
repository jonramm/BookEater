const db = require('../dbcon')
require('dotenv').config()
const sequelize = require('../sequelizeDbConn')
const { createBook, getBooks, getBookById } = require('../models/bookModel')
const { addUserBook, deleteUserBook } = require('../models/userBookModel')
const { getUserByToken } = require('../models/userModel')

const addBook = async (req, res) => {
    console.log('Adding book...')
    const {title, author} = req.body
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    createBook(title, author).then((newId) => {
      addUserBook(refreshToken, newId).then(() => {
        res.status(200).json({"message": "Book added!"})
      }).catch((err) => {
        console.log(err)
        res.status(500).json({"message": err.message}) 
      })
    }).catch((err) => {
      console.log(err)
      res.status(500).json({"message": err.message}) 
    })

    // db.query(
    //     `INSERT INTO books (title, author) VALUES ('${title}', '${author}'); INSERT INTO user_books (bookId, user) SELECT (select id from books order by id desc limit 1) as bookId, email from users where jwtToken ='${refreshToken}'`,
    //      (err, result) => {
    //         if(err) {
    //             console.log(err)
    //             res.status(500).json({"message": err.message}) 
    //           } else {
    //             res.sendStatus(200);
    //           }
    //      }
    // )
}

const fetchBooks = async (req, res) => {
    try {
      console.log('Fetching books...')
      const cookies = req.cookies
      if (!cookies?.jwt) return res.sendStatus(401)
      const refreshToken = cookies.jwt
      getUserByToken(refreshToken).then((user) => {
        getBooks(user.email).then((books) => {
          res.send(books)      
        })
      })
    } catch(err) {
      console.log(err)
    }
}

const destroyUserBook = async (req, res) => {
  try {
    console.log('Deleting book from user library...')
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    getUserByToken(refreshToken).then((user) => {
      deleteUserBook(user.email, req.body.bookId).then(() => {
        res.status(204).json({"message": "Book deleted successfully!"})      
      })
    })
  } catch(err) {
    console.log(err)
  }
}


module.exports = { addBook, fetchBooks, destroyUserBook }