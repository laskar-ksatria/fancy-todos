const express = require('express')
const Router = express.Router()
const todoController = require('../controllers/todoController')
const auth = require('../middlewares/auth')

Router.get('/', auth,todoController.readMe)
Router.post('/', auth,todoController.create)
Router.delete('/:todoId',auth,todoController.delete)
Router.put('/:todoId', auth, todoController.update)
Router.patch('/:todoId', auth, todoController.updateTodoStatus)

module.exports = Router