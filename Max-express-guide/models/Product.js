const path = require('path')
const fs = require('fs');
const rootDir = require('../helpers/path') //makes it easier and cleaner to get the root file on all platforms

const productFile = path.join(rootDir,'JsonDB','products.json')

//Because its an async code,the fs sections process and register with out returning code as they belong to those field
//ie we had a cb/ function parameter, which holds the data we need
//ie the arguement holds or is our final product
const getProductsFromFile = cb =>{
        fs.readFile(productFile, (err, fileContent) =>{
            if(err){
               return cb([]);
            }
            return cb(JSON.parse(fileContent));
        })
}

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        //so we are saving or putting the current instance
        //into our DB or products array above
        getProductsFromFile(products=>{
            products.push(this); //this here refers to the class and remais so as long as we use the method arrow function

            //save or write products back into file
            fs.writeFile(productFile, JSON.stringify(products),(writeErr) => {
                console.log(writeErr)
            });//JSON.stringify coverts array or objects to Json
        });

        //commented out because getProductsFromFile handles the file data fetching
        //read file using readFile
        // fs.readFile(productFile,(err, fileContent) => {
        //     let products = [];
        //     //if file is found
        //     if(!err){
        //         products = JSON.parse(fileContent);//JSON.parse, changes and a json to an array or object
        //     }
        //     products.push(this); //this here refers to the class and remais so as long as we use the method arrow function
        //
        //     //save or write products back into file
        //     fs.writeFile(productFile, JSON.stringify(products),(writeErr) => {
        //         console.log(writeErr)
        //     });//JSON.stringify coverts array or objects to Json
        // })
    }

    //Because its an async code,the fs sections process and register with out returning code as they belong to those field
    //ie we had a cb/ function parameter, which holds the data we need
    //it the arguement holds or is our final product
    static fetchAll(cb){
        getProductsFromFile(cb);
    }
}