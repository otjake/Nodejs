const Role = require('../models/Role')
const roles = async (req,res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving roles.' });
    }
}

module.exports = {
    roles,
}