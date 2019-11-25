//require-dotenv
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    require('dotenv').config()
}

//required-variabel
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT
const indexRouter = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler.js')

//mongoose-connection
mongoose.connect('mongodb://localhost/fancy-todos', {useNewUrlParser: true,  useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected to mongoose')
});


//app.use
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(indexRouter)
app.use(errorHandler)

//app-listen
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
