const baza = require('../Controllers/DataBaseC.js');
const Order = baza.Order;
const User = baza.User;
const Book = baza.Book;

const getFor = async (req, res) => {
    try {
        let user = await User.findOne({ where: { ID_UZYTKOWNIKA: req.params['id'] } });
        if (!user) { res.status(404).json("Nie ma takiego uzytkownika"); }
        let orders = await user.getOrders();
        if (!orders) {
            res.status(204).json("Nie ma zamowien");
        }
        res.status(200).json(orders);
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z order/id " + error); } catch { }
    }
};

const add = async (req, res) => {
    try {
        const userID = req.user.id;
        const obj = req.body;
        if (!obj.hasOwnProperty("IDKSIAZKI") || !obj.hasOwnProperty("ilosc")) {
            res.status(406).send("Zle dane");
        }
        let book = await Book.findOne({ where: { Id: obj.IDKSIAZKI } });
        if (!book) { res.status(404).send("Nie ma takiej ksiazki"); }
        let order = await Order.create({ 'ID_KSIAZKI': obj.IDKSIAZKI, 'ID_UZYTKOWNIKA': userID, 'ilosc': obj.ilosc });
        if (!order) {
            res.status(500).json("B³¹d przy wstawianiu danych");
        }
        res.status(201).send("ID: " + order.ID_ZAMOWIENIA);

    } catch (error) {
        try { res.status(500).send(); console.log("Problem z post order " + error); } catch { }
    }
};

const del = async (req, res) => {
    try {
        let order = await Order.findOne({ where: { ID_ZAMOWIENIA: req.params['id'] } });
        if (!order) {
            res.status(404).json("Nie ma takiego zamowienia");
        }
        if (order.ID_UZYTKOWNIKA != req.user.id) {
            res.status(403).json("Nie mozna usunac");
        }
        await order.destroy();
        res.status(204).send();
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z del order " + error); } catch { }
    }
};

const edit = async (req, res) => {
    try {
        let order = await Order.findOne({ where: { ID_ZAMOWIENIA: req.params['id'] } });
        if (!order) {
            res.status(404).json("Nie ma takiego zamowienia");
        }
        const obj = req.body;
        if (!obj.hasOwnProperty("IDKSIAZKI") || !obj.hasOwnProperty("ilosc")) {
            res.status(406).send("Zle dane");
        }
        if (order.ID_UZYTKOWNIKA != req.user.id) {
            res.status(403).json("Nie mozna modyfikowac");
        }
        let book = await Book.findOne({ where: { Id: obj.IDKSIAZKI } });
        if (!book) {
            res.status(404).send("Nie ma takiej ksiazki");
        }
        await Order.update({ 'ID_KSIAZKI': obj.IDKSIAZKI, 'ID_UZYTKOWNIKA': req.user.id, 'ilosc': obj.ilosc }, { where: { ID_ZAMOWIENIA: req.params['id'] } });
        res.status(205).send("Zmodyfikowano");
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z edit order " + error); } catch { }
    }

};

module.exports = { getFor, add, del, edit };