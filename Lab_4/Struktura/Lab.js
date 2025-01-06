//              DEFINICJE

const express = require('express')
const dotenv = require('dotenv');
const app = express()
app.use(express.json());
dotenv.config();
const UserR = require('./Routes/UserR.js');
const BookR = require('./Routes/BookR.js');
const OrderR = require('./Routes/OrderR.js');
const baza = require('./Controllers/DataBaseC.js');

const UserModel = require('./Models/UserModel.js');
const server = app.listen(5000, () => {
    console.log(`App start na porcie 5000`)
})

baza.connect();

//          EXIT

process.on('SIGINT', async () => {
    await baza.sequelize.close();
    server.close();
});

app.use("/api", UserR);
app.use("/api/books", BookR);
app.use("/api/orders", OrderR);