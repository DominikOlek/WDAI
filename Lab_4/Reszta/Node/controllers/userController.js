const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const hashpassword = asyncHandler(async (haslo) => {
    try {
        const hashedPassword = await bcrypt.hash(haslo, saltRounds);
        return hashedPassword;
    } catch (error) {
        return null;
    }
})

const comparepassword = asyncHandler(async (user, data) => {
    try {
        const result = await bcrypt.compare(user, data);
        return result;
    } catch (error) {
        return false;
    }
})


exports.register = asyncHandler(async(req, res) => {
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
        try { res.status(404).send(); } finally { console.log("Problem z baza Users"); }
    }
})

function generateJWT(data) {
    const claims = { id: data.ID_UZYTKOWNIKA, username: data.email };
    return jwt.sign(claims, process.env.TOKEN_SECRET, { expiresIn: '2000s' });
}

exports.login = asyncHandler(async (req, res) => {
    console.log(req.body);
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
        try { res.status(404).send(); } finally { console.log("Problem z baza Users"+error); }
    }
})