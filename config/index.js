var configValues = require('./config');

module.exports = {
    getConnectionString : function(){
        return 'mongodb://localhost:27017/todo-db';
    }
}