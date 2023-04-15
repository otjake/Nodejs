const { Router } =  require ('express')
const passport = require('passport')
//import user model
const User = require("../database/schema/User")
const {hashPassword,comparePassword} = require("../utils/helpers")

const router = Router();
router.post('/session-login',(request, response) => {
    const { username , password } = request.body;
    if(username && password){
        if(request.session.user){
            if(request.session.user.username == username && request.session.user.password == password){
                response.send('you already logged in')
            }else {
                response.status(422)
                response.send('Invalid details')
            }
        }else {
            request.session.user = {
                username,
                password
            }
            console.log("user session",request.session.user)
            response.send('login successful')
        }
    }else {
        response.status(422)
        response.send('Username and Password required')

    }
})

router.post('/login',async (request, response) => {
    const {username, password} = request.body;
    if (username && password) {
        const userDB = await User.findOne({username});
        if(!userDB){
            return response.sendStatus(401).send('Invalid details')
        }
        const isCorrectPassword = comparePassword(password,userDB.password);
        if(isCorrectPassword){
            //add user data to session
            request.session.user = userDB;
           return response.send('login successful')
        }else {
            return response.sendStatus(401).send('Invalid details')
        }
    } else {
        response.status(422)
        return response.send('Username and Password required')
    }
})

// this (passport.authenticate('local')) means we are authenticating using the local strategy
// found in youtube-express/src/strategies/local.js
router.post('/passport-login', passport.authenticate('local'), (request, response) => {
    console.log("passed");
    return response.sendStatus(200)
})

router.post('/register',async (request,response) => {
   const { username, email } = request.body;
   // 1. check if the email or username
    const userDB = await User.findOne({ $or: [{ username },{ email }]})
    if(userDB){
        return response.sendStatus(400).send({ msg: 'User already exists!'});
    }else{
        const password = hashPassword(request.body.password)
        // const newUser = await new User({ username, password, email});
        // await newUser.save().then(()=>
        //     response.status(201).send({ msg: 'User created'})
        // );

        //OR
        await User.create({ username, password, email}).then(()=>{
                return response.sendStatus(201).send({ msg: 'User created'})
            }
        );
    }
})

module.exports = router;