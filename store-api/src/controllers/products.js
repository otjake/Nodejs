const Product = require('../models/product');

const getAllProductsStatic = async (req,res) => {
    const products = await Product.find({}).sort('-name price').select('name price');
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req,res) => {
    const {featured, name, company, sort, selectFields, numericFilters} = req.query;
    let queryObject = {}
    if(featured){
        queryObject.featured = featured == 'true' ? true : false
    }
    if(name){
        queryObject.name = { $regex: name, $options: 'i'} //the mean product whose name match or are like the name passed
    }
    if(company){
        queryObject.company = company
    }

    if(numericFilters){
        const logicOperatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte'
        }
        //the regex to validate symbols passed
        const regEx = /\b(<|>|>=|=|<=)\b/g
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${logicOperatorMap[match]}-`
        )
        console.log(filters)

        const filterableOptions = ['price','rating']
        filters = filters.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-')
            if(filterableOptions.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        });
        console.log(queryObject)
    }

    let result = Product.find(queryObject);
    if(sort){
        //normally sort is space seperated eg sort("-name price")
        //but because we are submitting via postman params sort = -name,price
        //we separate it at the ',' before joining it back via space
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    }
    if(selectFields){
        //normally sort is space seperated eg fields("name price")
        //but because we are submitting via postman params selectFields = name,price
        //we separate it at the ',' before joining it back via space
        const fields = selectFields.split(',').join(' ');
        result = result.select(fields)
    }

    // const page = Number(req.query.page) || 1
    // const limit = Number(req.query.limit) || 2
    // const skip = (page-1) * limit;
    // result = result.skip(skip).limit(limit)

    const products = await result //the moment await is used in a quesy bulider the documents are fetched hence why it is moved here
    res.status(200).json({products, nbHits: products.length})
}

const createProduct = async (req,res) => {
    const product = await Product.create(req.body)
    res.status(201).json({product})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
    createProduct
}