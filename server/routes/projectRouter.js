const  express = require('express')
const Router = express.Router()
const authProject = require('../middlewares/authProject')
const authOwnerProject = require('../middlewares/authoOwnerProjext')
const auth = require('../middlewares/auth')
const projectController = require('../controllers/projectController')

Router.get('/', auth, projectController.readMe)
Router.post('/', auth, projectController.createProject)
Router.post('/:projectId/todos', auth, authProject, projectController.createTodo)
Router.put('/:projectId/:todoId/todos', auth,authProject, projectController.updateTodo)
Router.delete('/:projectId/:todoId/todos', auth, authProject, projectController.deleteTodo)
Router.delete('/:projectId', auth,authOwnerProject, projectController.deleteProject)
Router.patch('/:projectId/:userId', auth,authProject, projectController.addMember)
Router.patch('/:projectId/', auth, authProject, projectController.leaveProject)
Router.patch('/:projectId/:todoId/todos', auth, authProject, projectController.updateTodoStatus)

module.exports = Router