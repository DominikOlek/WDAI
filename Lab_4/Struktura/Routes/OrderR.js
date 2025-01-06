const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Cntrl = require("../Controllers/OrderController.js");
const Auth = require("../Authorize.js");

router.get('/:id', asyncHandler(Cntrl.getFor));

router.post('', Auth, asyncHandler(Cntrl.add));

router.delete('/:id', Auth, asyncHandler(Cntrl.del));

router.patch('/:id', Auth, asyncHandler(Cntrl.edit));

module.exports = router;