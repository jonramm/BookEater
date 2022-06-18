require('dotenv').config()
const { createBook, getBooks } = require('../models/bookModel')
const { addUserBook, deleteUserBook } = require('../models/userBookModel')
const { getUserByToken } = require('../models/userModel')
const { addReport, deleteReport } = require('../models/reportModel')
const { addReportNourishment } = require('../models/reportNourishmentModel')

const addBook = async (req, res) => {
  console.log('Adding book...')
  const { title, author } = req.body
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  console.log(cookies.jwt)
  const refreshToken = cookies.jwt
  createBook(title, author).then((newId) => {
    addUserBook(refreshToken, newId).then(() => {
      res.status(200).json({ "message": "Book added!" })
    }).catch((err) => {
      console.log(err)
      res.status(500).json({ "message": err.message })
    })
  }).catch((err) => {
    console.log(err)
    res.status(500).json({ "message": err.message })
  })
}

const addBookAndNourishment = async (req, res) => {
  console.log('Adding book and nourishment...')
  const { title, author, array, flavor } = req.body
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  console.log(cookies.jwt)
  const refreshToken = cookies.jwt
  createBook(title, author).then((newId) => {
    addUserBook(refreshToken, newId).then((userBook) => {
      addReport(userBook.email, '', userBook.bookId, flavor).then((newReport) => {
        addReportNourishment(newReport.id, array).then(() => {
          res.status(200).json({ 
            "id": newReport.id,
            "report": newReport.report,
            "title": title,
            "author": author,
            "bookId": userBook.bookId 
          })
        })
      })
    }).catch((err) => {
      console.log(err)
      res.status(500).json({ "message": err.message })
    })
  }).catch((err) => {
    console.log(err)
    res.status(500).json({ "message": err.message })
  })
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
  } catch (err) {
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
        deleteReport(req.body.reportId).then(() => {
          res.status(204).json({ "message": "Book deleted successfully!" })
      })
    })
    })
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  addBook,
  fetchBooks,
  destroyUserBook,
  addBookAndNourishment
}