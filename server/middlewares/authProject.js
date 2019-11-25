const Project = require('../models/project')
const Todo = require('../models/todo')

module.exports = (req,res,next) => {
    let userId = req.decoded.payload.id
    let projectId = req.params.projectId
    Project.findOne({_id: projectId})
        .then(function(project) {
            if (project) {
                
                let findMember = false;
                project.members.forEach(function (member) {
                    if (member == userId) {
                        findMember = true
                    }
                })

                if (findMember == true) {
                    next()
                }else {
                    next({message: 'You dont have authorize to do that'})
                }

            }else {
                next({message: 'Project not Found'})
            }
        })
        .catch(next)
}