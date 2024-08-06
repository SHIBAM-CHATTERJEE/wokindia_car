const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles} = require('../middeleware/auth');
const {createcar} = require("../controller/carrentcontroller") ;



router.route("/add").post(isAuthenticatedUser,createcar) ;




module.exports = router;