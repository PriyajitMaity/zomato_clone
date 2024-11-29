const express =require("express");
const router =express.Router();
const updateCart  =require('../controller/cart');

router.patch('/update-cart', updateCart);

module.exports =router