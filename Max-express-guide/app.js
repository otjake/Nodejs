const port = 3000;
const path = require('path');//get root path
const express = require('express')
const bodyParser = require('body-parser');

const badRouteController = require('./controllers/404')
const app = express();

app.set('view engine','pug')//setting the pug templating engine
app.set('views','views')//telling pug the folder for your template

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}))

//serve static files(images,assets,styling)
//granting read write access to public folder and entering the folder
//so we are already in it we just start from the subfolders
app.use(express.static(path.join(__dirname,'public')))

//it adds /admin to all the url routs in the adminRoutes
//like laravel prefix
app.use('/admin',adminRoutes);

app.use(shopRoutes);


//routes are checked on from top to bottom
// app.use((req, res, next) =>{
//     console.log("In the middleware")
//     next(); // this allows the process continue its journey or to anoter middleware else it dies
// });

//add 404s
app.use(badRouteController.badRoute)
//creating the server & running or keep the server running
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
