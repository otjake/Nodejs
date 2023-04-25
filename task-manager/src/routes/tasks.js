const { Router } =  require ('express')

const router = Router();
const { getAllTasks,createTask,getSingleTask,updateTask,deleteTask } = require('../controllers/task')

router.get('/',getAllTasks);
router.post('/',createTask);
router.get('/:id',getSingleTask);
router.delete('/:id',deleteTask);
router.put('/:id',updateTask);

module.exports = router