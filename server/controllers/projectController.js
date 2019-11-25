const Project = require('../models/project')
const Todo = require('../models/todo')
const User = require('../models/user')

class ProjectController {

    static  readMe (req,res, next) {
        let userId = req.decoded.payload.id
        Project.find({}).populate('todos').populate('members')
            .then(function (projects) {
                
                let myProjects = [];
                projects.forEach(function (project) {
                    let findUser = false
                    project.members.forEach(function (member) {
                        if (member._id == userId) {
                            findUser = true
                        }
                    })
                    if (findUser == true) {
                        myProjects.push(project)
                    }
                })
                res.status(200).json({projects: myProjects})
            })
            .catch(next)
    }

    static createProject (req,res, next) {
        let userId = req.decoded.payload.id
        Project.create({
            projectName: req.body.projectName,
            owner: userId,
            members: [userId]
        })
        .then(function(project) {
            res.status(201).json({project, message: 'Your new project has added to your project list'})
        })
        .catch(next)
    }

    static deleteProject (req,res, next) {
        let projectId = req.params.projectId
        Project.deleteOne({_id: projectId})
            .then(function () {
                res.status(202).json({message: 'Your project has been deleted'})
            })
            .catch(next)
    }

    static createTodo (req,res, next) {
        let userId = req.decoded.payload.id
        let projectId = req.params.projectId;
        let newTodo = null;
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            user: userId,
            project: projectId
        })
        .then(function(todo) {
            newTodo = todo
            return Project.updateOne({_id: projectId},{$push:{todos: todo._id}})
        })
        .then(function (project) {
            res.status(201).json({newTodo ,message: 'Your todo has added to your project'})
        })
        .catch(next)
    }

    static updateTodo (req,res,next) {
        let { title, description } = req.body
        let todoId = req.params.todoId;
        Todo.updateOne({_id: todoId}, { title, description }, {omitUndefined: true})
            .then(function () {
                res.status(202).json({message: 'Your todo Project has been updated'})
            })
            .catch(next)
        
    };

    static updateTodoStatus (req,res,next) {
        let todoId = req.params.todoId;
        Todo.updateOne({_id: todoId}, {$set: {completed: true}})
            .then(function () {
                res.status(202).json({message: 'Todo set to completed'})
            })
            .catch(next)
    }

    static deleteTodo (req,res,next) {
        let projectId = req.params.projectId
        let todoId = req.params.todoId
        Todo.deleteOne({_id: todoId})
            .then(function () {
                Project.findOne({_id: projectId})
                    return Project.updateOne({_id: projectId},{$pull: {todos: todoId}})
            })
            .then(function () {
                res.status(202).json({message: 'Your project todo has been deleted'})
            })
            .catch(next)
    }

    static addMember (req,res,next) {
        let projectId = req.params.projectId
        let username = req.body.username
        let projectName = null;
        User.findOne({username: username})
            .then(function(user) {
                if (user) {
                    
                    return Project.findOne({_id: projectId})
                }else {
                    next({message: 'User not found'})
                }
            })
            .then(function(project) {
                projectName = project.projectName
                let findMember = false;
                project.members.forEach(function (member) {
                    if (member == userId) {
                        findMember = true
                    }
                })
                if (findMember == true) {
                    next({message: 'You already add this username'})
                }else {
                    return Project.updateOne({_id: projectId}, {$push: {members: userId}})
                }
            })
            .then(function () {
                res.status(202).json({message: `${username} has been added to ${projectName} members`})
            })
            .catch(next)
    };

    static leaveProject (req,res,next) {
        let projectId = req.params.projectId
        let userId = req.decoded.payload.id
        let projectName = null
        Project.findOne({_id: projectId})
            .then(function (project) {
                projectName = project.projectName
                if (project.owner == userId) {
                    next({message: 'As owner, you cannot leave this project'})
                }else {
                    return Project.updateOne({_id: projectId},{$pull:{members: userId}})
                }
            })
            .then(function () {
                res.status(202).json({message: `You leave ${projectName} project`})
            })
            .catch(next)
    }

}

module.exports = ProjectController