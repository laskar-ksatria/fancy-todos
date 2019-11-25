const express = require('express')
const Router = express.Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const projectRouter = require('./projectRouter')

Router.use('/users',userRouter)
Router.use('/todos', todoRouter)
Router.use('/projects',projectRouter)

module.exports = Router