const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDbConn')

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    fName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jwtToken: {
        type: DataTypes.STRING,
        allowNull: true
    }
    }, 
    {
        tableName: 'users',
        timestamps: false
    }
)

const addUser = async (email, fName, lName, password, jwtToken) => {
    newUser = await User.create({email: email, fName: fName, lName: lName, password: password, jwtToken: jwtToken})
    console.log(`Adding ${newUser.email}...`)
}

const usersList = async () => {
    const users = await User.findAll();
    console.log("All users:", JSON.stringify(users, null, 2));
  }

const deleteUser = async (email) => {
    await User.destroy({
        where: {
            email: email
        }
    })
}

const updateUserInfo = async (email, fName, lName) => {
    await User.update({
        fName: fName,
        lName: lName
    }, {
        where: {
            email: email
        }
    })
}

const updateUserToken = async (email, token) => {
    await User.update({
        jwtToken: token
    }, {
        where: {
            email: email
        }
    })
}

const getUser = async (email) => {
    const [results, metadata] = await sequelize.query(`SELECT email, password, jwtToken, group_concat(ur.role) as roles FROM users JOIN user_roles ur ON email = ur.user WHERE email = '${email}';`)
    return JSON.stringify(results)
}

module.exports = { 
    User,
    usersList, 
    addUser, 
    deleteUser,
    updateUserInfo,
    updateUserToken,
    getUser
}