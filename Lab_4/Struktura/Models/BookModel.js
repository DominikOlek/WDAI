const { Sequelize } = require('sequelize');
const Book = {
    Id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nazwa: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    autor: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    rok: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    }
};
module.exports = Book;