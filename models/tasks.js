var mongoose = require('mongoose');
//const Schema = mongoose.Schema;

taskSchema = new mongoose.Schema({
    task: {type: String, required: true, unique: true, dropDups: true},
    parent_id :{ type: mongoose.Schema.Types.ObjectId,ref: 'Task', required: false},
    priority : {type: Number, required: true},
    start_date : {type: Date, required: true},
    end_date: {type: Date, required: true},
    finished: {type: Boolean,required: true, default: false}
  })

module.exports = mongoose.model('Task', taskSchema);
