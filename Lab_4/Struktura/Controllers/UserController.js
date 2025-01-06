const baza = require('../Controllers/DataBaseC.js');
const User = baza.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = (async (req, res) => {
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
        let user = await User.create({ 'email': obj.email, 'haslo': hash });
        if (!user) {
            res.status(500).json("B³¹d przy wstawianiu danych");
        }
        res.status(201).send("ID: " + user.ID_UZYTKOWNIKA);
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z rejestracja " + error); } catch { }
    }
});

const login = (async (req, res) => {
    try {
        const obj = req.body;
        if (!obj.hasOwnProperty("email") || !obj.hasOwnProperty("haslo")) {
            res.status(406).send("Zle dane");
        }
        if (await User.count() == 0) {
            res.status(404).json("B³êdny email lub haslo");
        }
        let user = await User.findOne({ where: { email: obj.email } });
        const result = await comparepassword(obj.haslo, user.haslo);
        if (!user || !result) {
            res.status(406).json("B³êdny email lub haslo");
        }
        let token = generateJWT(user);
        res.status(200).json(token);
    } catch (error) {
        try { res.status(500).send(); console.log("Problem z logowaniem " + error); } catch { }
    }
});

function generateJWT(data) {
    const claims = { id: data.ID_UZYTKOWNIKA, username: data.email };
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

module.exports = { login, register };