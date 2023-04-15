const Product = require('../models/Product');

exports.getAddProduct = (req, res, next) =>{
    console.log("From add product contoller")
    // res.sendFile(path.join(rootDir ,'views','add-product.html'));//'../views/add-product.html'
    res.render('admin/add-product',{pageTitle:"Add product",path:'/admin/add-product'})
}

exports.postAddProduct = (req, res, next) =>{
    // console.log(req.body)
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const description = req.body.description
    const price = req.body.price
    const product = new Product(title,imageUrl,description,price);//create a new instance
    product.save();//save the instance
    res.redirect('/')
}

exports.getProducts = (req, res, next) =>{
    Product.fetchAll((products) =>{
        res.render('admin/admin-product-list',{prods: products, pageTitle: 'Admin Products', path: '/admin/products'})
    })
}