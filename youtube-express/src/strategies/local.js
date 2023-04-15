const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../database/schema/User')
const {comparePassword} = require("../utils/helpers");

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
                done(null,userDB)
            }else {
                done(null,null)
            }
        } catch (err){
            done(err,null)
        }

    })
)