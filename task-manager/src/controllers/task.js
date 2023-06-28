const Task = require('../models/Task');
const asyncWrapper = require("../middleware/asyncWrapper");// the instroduction of the express-async-error package makes this redundant
const { createCustomError } = require("../errors/custom-error")
//using the asyncWrapper we can handle the try catch block in a single method/class
const getAllTasks = asyncWrapper(async (req, res) => {
        let tasks = await Task.find({})
        console.log("requests",req.body); //form body
        console.log("requests",req.query); //the query params ?
        console.log("requests",req.params); // in the url {}
        const {completed} = req.query;
        if(completed){
            tasks = tasks.filter(function (el) {
                return el.completed = completed;
            });
        }
        res.status(200).json({tasks})
})

const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const getSingleTask = asyncWrapper( async (req, res, next) => {
    const {id: taskID} = req.params
    const task = await Task.findOne({_id: taskID});
    if(!task){
        //since we have an error handler filr ../middleware/errorHandler
        //we can make sure all errors are formatted or passed through it, by creating an error instance
        //all error instances are called of passed through the ../middleware/errorHandler
        const error = new Error('Unable to get task')
        error.status = 404
        return next(error);
        // return res.status(404).json({ msg: `Unable to get task` })
    }
    res.status(200).json({ task })
});

const updateTask = asyncWrapper(async (req, res, next) => {
        const {id: taskID} = req.params
        const task = await Task.findOneAndUpdate(
            {_id:taskID},
            req.body,
            {
                // new:true,
                runValidators:true // this so that model set validators also run on update
            }
        )
        if(!task){
            //making use of a custom error class which extends the base error and offers better flexibility
            return next(createCustomError("Unable to get task",400))
            // return res.status(404).json({ msg: `Unable to get task` })
        }
        res.status(200).json({id:taskID, task :req.body })
});

const deleteTask = asyncWrapper( async (req, res) => {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return res.status(404).json({ msg: `Unable to get task` })
        }
        // res.status(200).json({task})
        res.status(200).json({task:null, status:'success'})
});

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}