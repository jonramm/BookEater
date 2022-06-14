const db = require('../dbcon')
require('dotenv').config()
const sequelize = require('../sequelizeDbConn')
const { createBook, getBooks, getBookById } = require('../models/bookModel')
const { addUserBook } = require('../models/userBookModel')
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
          console.log(books)
          res.send(books)      
        })
      })
    } catch(err) {
      console.log(err)
    }
}


module.exports = { addBook, fetchBooks }