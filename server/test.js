require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const { usersList, addUser, deleteUser } = require('./models/userModel')
const { addBook, deleteBook, booksList } = require('./models/bookModel')
const { addReport, reportsList } = require('./models/reportModel')
const { userRolesList, addUserRole } = require('./models/userRoleModel')
const { userBooksList, addUserBook } = require('./models/userBookModel')
 
const sequelize = require('./sequelizeDbConn')

// const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
//     dialect: 'mysql'
// })

// const User = sequelize.define('User', {
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         primaryKey: true
//     },
//     fName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     jwtToken: {
//         type: DataTypes.STRING,
//         allowNull: true
//     }
//     }, 
//     {
//         tableName: 'users',
//         timestamps: false
//     }
// )

// User.sync().then(()=> {
//     console.log('sync complete')
// }).catch((err) => {
//     console.log(err)
// })

// const jane = User.build({ fName: "Jane", lName: 'Doe', email: 'jane@gmail.com', password: 'test' });
// console.log(jane instanceof User); // true
// console.log(jane.fName); // "Jane"

// jane.save().then(() => {
//     console.log('Jane was saved to the database!');
// }).catch((err) => {
//     console.log(err)
// })

// const usersList = async () => {
//     const users = await User.findAll();
//     console.log("All users:", JSON.stringify(users, null, 2));
// }

// addUser('jdoe@gmail.com', 'John', 'Doe', 'test').then(() => {
//     usersList()
// })

// deleteUser('jdoe@gmail.com').then(() => {
//     usersList()
// })

// deleteBook(6).then(() => {
//     booksList()
// }).catch((err) => {
//     console.log(err)
// })

// addBook('The Snow Leopard', 'Peter Matthiessen')
// booksList()

// addReport('samanthajanemullen@gmail.com', 'This is my report.', '2022-06-13', 2).then(() => {
//     reportsList()
// })

// userRolesList().catch((err) => {
//     console.log(err)
// })

// userBooksList().catch((err) => {
//     console.log(err)
// })

// addUserRole('samanthajanemullen@gmail.com', 3).then(() => {
//     userRolesList()
// }).catch((err) => {
//     console.log(err)
// })

addUserBook('samanthajanemullen@gmail.com', 8).then(() => {
    userBooksList()
}).catch((err) => {
    console.log(err)
})
