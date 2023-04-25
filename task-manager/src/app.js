require('./db/connect')
const express = require('express');
const app = express();
const port = 3000
const TaskRoutes =  require('./routes/tasks')

app.use(express.json())
app.get('/hello',(req,res) =>{
    res.send("task manager app")
})

app.use('/api/v1/tasks', TaskRoutes)
app.listen(port,()=> console.log("run express on port 3000")) //express listens to actions via the port
