const baza = require('../Controllers/DataBaseC.js');
const Book = baza.Book;

const getAll = async (req, res) => {
    try {
        let books = await Book.findAll();
        if (books.length === 0) {
            res.status(404).json("Nie ma danych");
        }
        res.status(200).json(books);
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z books " + error); } catch { }
    }
};

const getOne = async (req, res) => {
    try {
        let book = await Book.findOne({ where: { Id: req.params['id'] } });
        if (!book) {
            res.status(404).json("Nie ma danych");
        }
        res.status(200).json(book);
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z books/id " + error); } catch { }
    }
};

const addOne = async (req, res) => {
    try {
        const obj = req.body;
        if (!obj.hasOwnProperty("nazwa") || !obj.hasOwnProperty("autor") || !obj.hasOwnProperty("rok")) {
            res.status(406).send("Zle dane");
        }
        let book = await Book.create(obj);
        if (!book) {
            res.status(500).json("B³¹d przy wstawianiu danych");
        }
        res.status(201).send("ID: " + book.Id);
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z set books "+error); } catch { }
    }
};

const delOne = async (req, res) => {
    try {
        let book = await Book.findOne({ where: { Id: req.params['id'] } });
        if (!book) {
            res.status(404).json("Nie ma takiej ksiazki");
        }
        await book.destroy();
        res.status(204).send();
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z del books " + error); } catch { }
    }
};

module.exports = { getAll, getOne, addOne, delOne };