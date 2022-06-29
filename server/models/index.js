const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, allowNull: false, unique: true },
	password: { type: DataTypes.STRING, allowNull: false },
	activationLink: { type: DataTypes.STRING, allowNull: false },
	isActivated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
	
	createdAt: { type: DataTypes.DATE, allowNull: true },
	updatedAt: { type: DataTypes.DATE, allowNull: true },
})


const Token = sequelize.define("token", {
    userId: { type: DataTypes.INTEGER },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
});

User.hasOne(Token);
Token.belongsTo(User);

sequelize.sync()

module.exports = { User, Token }