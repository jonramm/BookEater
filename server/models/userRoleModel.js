const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDbConn')
const { User } = require('./userModel')
const { Role } = require('./roleModel')

const UserRole = sequelize.define('UserRole', {
    user: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'email'
        }
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id'
        }
    }
    }, 
    {
        tableName: 'user_roles',
        timestamps: false
    }
)

/* remove automatic sequelize 'id' field */
UserRole.removeAttribute('id')

const userRolesList = async () => {
    const userRoles = await UserRole.findAll();
    console.log("All user roles:", JSON.stringify(userRoles, null, 2));
}

const addUserRole = async (user, role) => {
    const newUserRole = await UserRole.create({user: user, role: role})
    console.log(`Adding ${newUserRole.user} to role ${newUserRole.role}...`)
}

module.exports = {
    userRolesList,
    addUserRole
}