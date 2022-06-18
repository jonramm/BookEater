const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDbConn')

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, 
    {
        tableName: 'books',
        timestamps: false
    }
)

const createBook = async (title, author) => {
    newBook = await Book.create({title: title, author: author})
    console.log(`Adding ${newBook.title}...`)
    return newBook.id
  }

const getBooks = async (email) => {
    const [results, metadata] = await sequelize.query(`select b.title, b.author, b.id as 'bookId', r.report, r.user, r.id, r.dateAdded, r.flavor from user_books ub join books b on ub.bookId = b.id left join reports r on ub.bookId = r.bookId and r.user = '${email}' where ub.user = '${email}' order by r.dateAdded desc;`)
    return JSON.stringify(results)
}

const getBookById = async (id) => {
    const book = await Book.findOne({
        where: {
            id: id
        }
    })
    return book
}

module.exports = { 
    Book,
    createBook, 
    getBooks,
    getBookById
  }