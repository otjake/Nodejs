const Product = require('../models/Product');

exports.getProducts = (req, res, next) =>{
    // console.log("From root middleware",adminService.products)
    // res.send('<h1>From Response Middleware in express js</h1>');
    // res.sendFile(path.join( rootDir ,'views' ,'shop.html'))//for rendering html
    // const products = adminService.products;
    //to render a templating engine file
    //we already defined our default templating engine an path to file in app.js

    Product.fetchAll((products) =>{
        res.render('shop/shop',{prods: products, pageTitle: 'All Products', path: '/products'})
    })//just call the method, since it returns the product array from the model
}

exports.getIndex = (req, res, next) =>{
    Product.fetchAll((products) =>{
        res.render('shop/index',{prods: products, pageTitle: 'Shop', path: '/shop'})
    })
}

exports.getCart = (req, res, next) =>{
        res.render('shop/cart',{pageTitle: 'Your Cart', path: '/cart'})
}

exports.getOrders = (req, res, next) =>{
        res.render('shop/orders',{pageTitle: 'Your Orders', path: '/orders'})
}

exports.getCheckout = (req, res, next) =>{
        res.render('shop/checkout',{pageTitle: 'Checkout', path: '/checkout'})
}