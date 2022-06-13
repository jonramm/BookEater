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

User.belongsToMany(Role, { through: {model: UserRole, unique: false }})
Role.belongsToMany(User, { through: {model: User, unique: false }})

const userRolesList = async () => {
    const userRoles = await UserRole.findAll();
    console.log("All user roles:", JSON.stringify(userRoles, null, 2));
}

module.exports = {
    userRolesList
}