const mongoose = require('mongoose')
const { hashPass } = require('../helpers/hashPassword')

const userSchema = new mongoose.Schema ({
    username: {
        type: String,  // image: {
            //     type: String
            // }
        required: [true, 'Username Cannot be empty'],
        validate: {
            validator: function (value) {
                return this.model('User').findOne({username: value})
                    .then(function (user) {
                        if (user) {
                            return false;
                        }else {
                            return true
                        }
                    })
            },
            message: props => `${props.value} already taken with someone`
        }
    },
    password: {
        type: String,
        required: [true, 'Password Cannot be empty']
    },
    // projects: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Project'
    // }],
    // image: {
    //     type: String
    // }
})

userSchema.pre('save', function (next) {
    let pass = hashPass(this.password)
    this.password = pass
    next()
})

const user = mongoose.model('User', userSchema)

module.exports = user