// https://github.com/john-smilga/node-express-course
require('./db/connect')
const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const notFound = require('./middleware/notFound')
//custom error handler
const errorHandlerMiddleware = require('./middleware/errorHandler')
require('dotenv').config();//invokes valus in .env file,and we can get env value with process.env

const port = process.env.PORT || 3000
const TaskRoutes =  require('./routes/tasks')

app.use(express.json())
app.use('/api/v1/tasks', TaskRoutes)

app.use(notFound)
app.use(errorHandlerMiddleware)

//this is because we want DB connected before app starts running
const start = async () => {
  try {
      await connectDB(process.env.MONGO_URI).then(() => console.log("connected to Db")).catch((err) => console.log(err))
      app.listen(port,()=> console.log("run express on port 3000")) //express listens to actions via the port

  } catch (error){
      console.log(error)
  }
}

start()