const { Sequelize } = require('sequelize');
const User = {
    ID_UZYTKOWNIKA: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    haslo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
};
module.exports = User;