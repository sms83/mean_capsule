// task.route.js

const express = require('express');
const app = express();
const router = express.Router();

// Require Task model in our routes module
let Task = require('../models/tasks');

// Defined store route
router.route('/add').post(function (req, res) {
  let taskData = new Task(req.body);
  console.log(taskData);
  taskData.save()
    .then(taskrec => {
    res.status(200).json({'taskData': 'Task in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
router.route('/').get(function (req, res) {
    Task.find(function (err, taskLists){
    if(err){
      console.log(err);
    }
    else {
      res.json(taskLists);
    }
  });
});


// Fetch ID for edit
router.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Task.findById(id, function (err, taskIdResult){
      res.json(taskIdResult);
  });
});

// Update id route
router.route('/update/:id').post(function (req, res) {
  Task.findById(req.params.id, function(err, taskIdResult) {
  if (!taskIdResult)
    return next(new Error('Could not load Document'));
  else {
      taskIdResult.task = req.body.task;
      taskIdResult.priority = req.body.priority;
      taskIdResult.start_date = req.body.start_date;
      taskIdResult.end_date = req.body.end_date;

      taskIdResult.save().then(taskIdResult => {
        res.json('Task update complete');
    })
    .catch(err => {
          res.status(400).send("unable to update the database");
    });
  }
});
});


// Defined delete | remove | destroy route
router.route('/finish/:id').post(function (req, res) {
  Task.findById(req.params.id, function(err, taskIdResult) {
  if (!taskIdResult)
    return next(new Error('Could not load Document'));
  else {
      /*taskIdResult.task = req.body.task;
      taskIdResult.priority = req.body.priority;
      taskIdResult.start_date = req.body.start_date;
      taskIdResult.end_date = req.body.end_date;*/
      taskIdResult.finished = true;

      taskIdResult.save().then(taskIdResult => {
        res.json('Task Finished successfully');
    })
    .catch(err => {
          res.status(400).send("unable to update the database");
    });
  }
});
});

module.exports = router;