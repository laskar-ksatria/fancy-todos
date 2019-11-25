const Todo = require('../models/todo')

class TodoController {

    static create(req,res,next) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            user: req.decoded.payload.id
        })
        .then(function (todo) {
            res.status(201).json({todo, message: 'Your new todo has added to your list'})
        })
        .catch(next)
    };

    static readMe (req,res,next) {
        const id = req.decoded.payload.id
        Todo.find({user: id})
            .then(function (todos) {
                res.status(200).json(todos)
            })
            .catch(next)
    };

    static delete (req,res,next) {
        const id = req.params.todoId
        Todo.deleteOne({_id: id})
            .then(function () {
                res.status(202).json({message: `Your selected todo has been deleted`})
            })
            .catch(next)
    };

    static update (req,res,next) {
        const id = req.params.todoId
        Todo.updateOne({_id: id}, {title: req.body.title, description: req.body.description}, {omitUndefined: true})
            .then(function () {
                res.status(202).json({message: `Your selected todo has been updated`})
            })
            .catch(next)
    }

    static updateTodoStatus (req,res,next) {
        let todoId = req.params.todoId;
        Todo.updateOne({_id: todoId}, {$set: {completed: true}})
            .then(function () {
                res.status(202).json({message: 'Todo set to completed'})
            })
            .catch(next)
    }


}

module.exports = TodoController