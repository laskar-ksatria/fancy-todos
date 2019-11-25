const Project = require('../models/project')

module.exports = (req, res, next) => {
    let userId = req.decoded.payload.id
    let projectId = req.params.projectId
    Project.find({_id: projectId})
        .then(function(project) {
            if (project.owner == userId) {
                next()
            }else {
                next({message: 'Just Owner cant delete this project'})
            }
        })
        .catch(next)
}