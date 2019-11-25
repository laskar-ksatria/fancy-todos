const User = require('../models/user')
const jwt = require('../helpers/jwt')

module.exports = (req,res,next) => {

    if (req.headers.token) {
        const decoded = jwt.tokenVerify(req.headers.token)
        req.decoded = decoded
        next()

    }else {
        next({message: 'You must login first'})
    }


};