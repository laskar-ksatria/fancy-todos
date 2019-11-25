const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: [true, 'Project name cannot be empty']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }]
})

const project = mongoose.model('Project', projectSchema)

module.exports = project;