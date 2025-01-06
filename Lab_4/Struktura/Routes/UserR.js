const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Cntrl = require("../Controllers/UserController.js");


router.post('/register', asyncHandler(Cntrl.register));


router.post('/login', asyncHandler(Cntrl.login));


module.exports = router;