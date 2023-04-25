const getAllTasks = (req,res) =>{
    res.send('all items')
}

const createTask = (req, res) => {
    res.json(req.body)
}

const getSingleTask = (req, res) => {
    res.json(req.params)
}

const updateTask = (req, res) => {
    res.send('update task')
}

const deleteTask = (req, res) => {
    res.send('delete task')
}

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}