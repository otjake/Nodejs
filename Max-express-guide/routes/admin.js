const path = require('path');//get root path
const express = require('express');

const rootDir = require('../helpers/path') //makes it easier and cleaner to get the root file on all platforms
const adminController = require('../controllers/admin')
const router = express.Router();


// /admin/add-product => GET
router.get('/add-product',adminController.getAddProduct);

router.get('/products',adminController.getProducts);

//this middleware us used to utilize the body passer package app.js, which registers a middle ware
//with a next, which parses our request body, except files and json
//since its a form submission from the /add-product rout its a post request
//the use takes all http request
//we can also use get,patch,put.delete

// /admin/add-product => POST
router.post('/add-product',adminController.postAddProduct);

module.exports = router;
