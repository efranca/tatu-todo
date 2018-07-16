var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
    userName : String,
    toDo : String,
    isDone : Boolean,
    created : Date
});

var Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;