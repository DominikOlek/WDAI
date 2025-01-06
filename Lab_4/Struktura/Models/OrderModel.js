const { Sequelize } = require('sequelize');
const Order = {
    ID_ZAMOWIENIA: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ID_KSIAZKI: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    ID_UZYTKOWNIKA: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    ilosc: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
};
module.exports = Order;