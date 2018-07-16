var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));

    // CRUD operations
    app.get('/api/todo', function(req, res){
        Todos.find({}, function(err, data){
            res.send(data);
        });
    });

    app.get('/api/todo/:id', function(req, res){
        Todos.findById({ _id : req.params.id }, function(err, data){
            res.send(data);
        });
    });

    app.get('/api/todo/user/:username', function(req, res){
        Todos.find({ userName : req.params.username }, function(err, data){
            res.send(data);
        });
    });

    app.post('/api/todo', function(req, res){
        if (req.body.id) {
            // update
            Todos.findByIdAndUpdate(req.body.id,
            {
                toDo : req.body.toDo,
                isDone : req.body.isDone,
                created : Date.now()
            }, function(err, todo){
                if (err) throw err;
                res.send(todo);
            });
        } else {
            // create
            var newTodo = Todos({
                userName : 'peter',
                toDo : req.body.toDo,
                isDone : req.body.isDone,
                created : Date.now()
            });
            
            newTodo.save(function(err, result){
                if (err) throw err;
                res.send(result);
            });
        }
    });    

    app.delete('/api/todo', function(req, res)
    {
        Todos.findByIdAndRemove(req.body.id, function(err, result) {
            if (err)  throw err;
            res.send('Delete success!');
        });
    });

    // Seed
    app.post('/api/todo/seed', function(req, res)
    {
        var starterTodos = [
            {
                userName : 'davi',
                toDo : 'Learn Grunt',
                isDone : false,
                created: Date.now()
            },
            {
                userName : 'lisy',
                toDo : 'Learn Bower or Yarn?!',
                isDone : false,
                created: Date.now()
            }
        ];

        Todos.create(starterTodos, function(exception, result){
            res.send(result);
        });
    });
};