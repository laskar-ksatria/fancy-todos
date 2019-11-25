const bcr = require('bcryptjs')

function hashPass(pass) {
    return bcr.hashSync(pass, bcr.genSaltSync(3))
}

function checkPass (pass, hPass) {
    return bcr.compareSync(pass,hPass)
}

module.exports = {
    hashPass,
    checkPass
}