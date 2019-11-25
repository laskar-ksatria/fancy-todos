const User = require('../models/user')
const { checkPass } = require('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')
const axios = require('axios')

class UserController {

    static readAll (req,res,next) {
        User.find({})
            .then(function (users) {
                res.status(200).json(users)
            })
            .catch(next)
    };

    static login (req,res,next) {
        
        User.findOne({username: req.body.username})
            .then(function (user) {
                if (user && checkPass(req.body.password, user.password)) {
                    let payload = {
                        id: user._id,
                        username: user.username
                    }
                    let token = generateToken(payload)
                    res.status(202).json({token, message: `Welcome ${user.username}, We hope you enjoy our app`})
                }else {
                    next({status: 404, message: 'Invalid Username / Password'})
                }
            })
            .catch(function (err) {
                next(err)
            })
    };

    static create (req,res,next) {
        // let imageUser = null
        // axios({
        //     url: `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${req.body.username}`,
        //     method: 'GET',
        // })
        // .then(function ({data}) {
        //     imageUser = data
        //     return User.create({
        //         username: req.body.username,
        //         password: req.body.password,
        //         image: imageUser
        //     })
        // })
        // .then(function(user) {
        //     res.status(201).json({user, message: `Thank you ${user.username} :), now you can process your login`})
        // })
        // .catch(function (err) {
        //     next(err)
        // })

        User.create({
            username: req.body.username,
            password: req.body.password,
        })
        .then(function(user) {
            res.status(201).json({user, message: `Thank you ${user.username} :), now you can process your login`})
        })
        .catch(function (err) {
            next(err)
        })

    }

}


module.exports = UserController