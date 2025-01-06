//              DEFINICJE
const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const app = express()
app.use(express.json());
dotenv.config();
const saltRounds = 10; 

const server = app.listen(5000, () => {
    console.log(`App start na porcie 5000`)
})

//              FUNKCJE GLOBALNE
function authenticate(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


//                  BAZA
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
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Baza polaczona');
    } catch (error) {
        console.error('Brak polaczenia z baza: ', error);
    }
})();

(async () => {
    try {
        await sequelize.sync();
        console.log('Baza synchronizowana');
    } catch (error) {
        console.error('Error Baza nie synchronizowana: ', error);
    }
})();

//              MODELE
const User = sequelize.define('User', {
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
});

const Book = sequelize.define('Book', {
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
});

const Order = sequelize.define('Order', {
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
});

User.hasMany(Order, { foreignKey: 'ID_UZYTKOWNIKA' });
Order.belongsTo(User, { foreignKey: 'ID_UZYTKOWNIKA' });

Book.hasMany(Order, { foreignKey: 'ID_KSIAZKI' });
Order.belongsTo(Book, { foreignKey: 'ID_KSIAZKI' });



//             BOOKSERVICE


app.get('/api/books', async (req, res) => {
    try {
        let books = await Book.findAll();
        if (books.length === 0) {
            res.status(404).json("Nie ma danych");
        }
        res.status(200).json(books);
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z books"); } catch { }
    }
})

app.get('/api/books/:id', async (req, res) => {
    try {
        let book = await Book.findOne({ where: { Id: req.params['id'] } });
        if (!book) {
            res.status(404).json("Nie ma danych");
        }
        res.status(200).json(book);
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z books/id"); } catch { }
    }
})

app.post('/api/books', authenticate, async (req, res) => {
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
        try { res.status(500).send(); console.log("Problem z set books"); } catch { }
    }
})

app.delete('/api/books/:id', authenticate, async (req, res) => {
    try {
        let book = await Book.findOne({ where: { Id: req.params['id'] } });
        if (!book) {
            res.status(404).json("Nie ma takiej ksiazki");
        }
        await book.destroy();
        res.status(204).send();
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z del books"); } catch { }
    }
})

//                  USERSERVICE

app.post('/api/register', async (req, res) => {
    try {
        const obj = req.body;
        if (!obj.hasOwnProperty("email") || !obj.hasOwnProperty("haslo")) {
            res.status(406).send("Zle dane");
        }
        let isBe = await User.findOne({ where: { email: obj.email } });
        if (isBe) {
            res.status(406).send("Ten email jest wykorzystany");
        }

        let hash = await hashpassword(obj.haslo);
        if (hash == null) { res.status(500).json("B³¹d przy rejestracji"); }
        let user = await User.create({'email':obj.email,'haslo':hash});
        if (!user) {
            res.status(500).json("B³¹d przy wstawianiu danych");
        }
        res.status(201).send("ID: " + user.ID_UZYTKOWNIKA);
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z rejestracja"); } catch { }
    }
})

//      FUNKCJE POMOCNICZE

app.post('/api/login', async (req, res) => {
    try {
        const obj = req.body;
        if (!obj.hasOwnProperty("email") || !obj.hasOwnProperty("haslo")) {
            res.status(406).send("Zle dane");
        }
        let user = await User.findOne({ where: { email: obj.email } });
        const result = await comparepassword(obj.haslo, user.haslo);
        if (!user || !result) {
            res.status(500).json("B³êdny email lub haslo");
        }
        let token = generateJWT(user);
        res.status(200).json(token);
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z logowaniem"); } catch { }
    }
})

function generateJWT(data) {
    const claims = { id: data.ID_UZYTKOWNIKA, username:data.email};
    return jwt.sign(claims, process.env.TOKEN_SECRET, { expiresIn: '2000s' });
}


const hashpassword = async (haslo) => {
    try {
        const hashedPassword = await bcrypt.hash(haslo, saltRounds);
        return hashedPassword;
    } catch (error) {
        return null;
    }
}

const comparepassword = async (user, data) => {
    try {
        const result = await bcrypt.compare(user, data);
        return result;
    } catch (error) {
        return false;
    }
}

//              ORDERSERVICE

app.get('/api/orders/:id', async (req, res) => {
    try {
        let user = await User.findOne({ where: { ID_UZYTKOWNIKA: req.params['id'] } });
        if (!user) { res.status(404).json("Nie ma takiego uzytkownika"); }
        let orders = await user.getOrders();
        if (!orders) {
            res.status(204).json("Nie ma zamowien");
        }
        res.status(200).json(orders);
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z order/id"); } catch { }
    }
})

app.post('/api/orders',authenticate, async (req, res) => {
    try {
        const userID =req.user.id;
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
        try { res.status(500).send(); console.log("Problem z post order"); } catch { }
    }
})

app.delete('/api/orders/:id', authenticate, async (req, res) => {
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
        try { res.status(500).send(); console.log("Problem z del order"); } catch { }
    }
})

app.patch('/api/orders/:id', authenticate, async (req, res) => {
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
        await Order.update({ 'ID_KSIAZKI': obj.IDKSIAZKI, 'ID_UZYTKOWNIKA': req.user.id, 'ilosc': obj.ilosc }, { where: { ID_ZAMOWIENIA: req.params['id'] } });
        res.status(205).send("Zmodyfikowano");
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z edit order"); } catch { }
    }

})


//          EXIT

process.on('SIGINT', async() => {
    await sequelize.close();
    server.close();
});