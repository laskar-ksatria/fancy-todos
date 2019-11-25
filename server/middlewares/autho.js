const Todo = require('../models/todo')

module.exports = (req,res,next) =>{

    let id = req.params.todoId
    Todo.find({_id: id})
        .then(function (todo) {
            if (todo.user == req.decoded.payload.id) {
                next()
            }else {
                res.status(403).json({message: 'You dont have authorize to do that'})
            }
        })
        .catch(next)


}