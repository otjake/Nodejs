const Category = require('../models/Category')
const categories = async (req,res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving categories.' });
    }
}

module.exports = {
    categories,
}