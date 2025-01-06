const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Cntrl = require("../Controllers/BookController.js");
const Auth = require("../Authorize.js");

router.get('', asyncHandler(Cntrl.getAll))

router.get('/:id', asyncHandler(Cntrl.getOne))

router.post('', Auth, asyncHandler(Cntrl.addOne))

router.delete('/:id', Auth, asyncHandler(Cntrl.delOne))

module.exports = router;