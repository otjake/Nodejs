const { validationResult } = require('express-validator');
const Message = require('../models/Message')
const Product = require("../models/Product");
const messages = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Handling validation errors
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        console.log("message list");
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Handling validation errors
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        console.log('message create 33')
        const {name,message} = req.body
        let body = {
            'name' : name,
            'message' : message,
        }
        const createdMessage = await Message.create(body);
        io.emit('message', body);
        res.status(200).json(createdMessage);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    messages,
    create
}