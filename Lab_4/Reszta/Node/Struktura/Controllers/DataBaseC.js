const UserR = require('../Routes/UserR.js');
const UserModel = require('../Models/UserModel.js');
const BookModel = require('../Models/BookModel.js');
const OrderModel = require('../Models/OrderModel.js');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database2.sqlite',
    pool: {
        max: 5,
        min: 0,
        acquire: 1000,
        idle: 1000,
    },
});


const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Baza polaczona');
    } catch (error) {
        console.error('Brak polaczenia z baza: ', error);
    }
};

var User = sequelize.define('User', UserModel);
var Book = sequelize.define('Book', BookModel);
var Order = sequelize.define('Order', OrderModel);
User.hasMany(Order, { foreignKey: 'ID_UZYTKOWNIKA' });
Order.belongsTo(User, { foreignKey: 'ID_UZYTKOWNIKA' });

Book.hasMany(Order, { foreignKey: 'ID_KSIAZKI' });
Order.belongsTo(Book, { foreignKey: 'ID_KSIAZKI' });

(async () => {
    try {
        await sequelize.sync();
        console.log('Baza synchronizowana');
    } catch (error) {
        console.error('Error Baza nie synchronizowana: ', error);
    }
})();


module.exports = { sequelize, connect,User,Book,Order }