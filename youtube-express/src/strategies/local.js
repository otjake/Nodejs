const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../database/schema/User')
const {comparePassword} = require("../utils/helpers");

//this is called on user login serializing the user and placing the user id a passport session
passport.serializeUser((user, done) => {
    console.log("Serialozing user",user)
    done(null, user.id)
})

//this is called on each request,it takes an id and search the user table for the user object
//to be used as the request.user object
passport.deserializeUser(async (id, done) => {
    console.log("DeSerialozing user", id)
    try {
        const user = await User.findById(id)
        if(!user) throw new Error("user not found")
        done(null,user);
    }catch (err){
        console.log(err);
        done(err,null)
    }
})

passport.use(
    new Strategy({
        usernameField: 'username', //by default it works with thw username field if we were validatong with email , 'username' would be 'email'
    },async (username, password, done) => {
        //done takes to arguements, the error message and data or success message
        console.log(username);
        console.log(password);
        try {
            if (!username || !password) {
                done(new Error('Bad Request, Missing Credentials'), null);
            }
            const userDB = await User.findOne({username})
            if(!userDB){
                throw new Error('User not found')
            }
            const isCorrectPassword = comparePassword(password,userDB.password);
            if(isCorrectPassword){
                //add user data to session
                console.log("before done","Login user")
                done(null,userDB)
                //from here it breaks to the passport.serialize user
            }else {
                done(null,null)
            }
        } catch (err){
            done(err,null)
        }

    })
)