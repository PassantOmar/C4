const mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/validations'),
  User = mongoose.model('User'); // only the user model is requried as scheduleSchema is in the user model in the form of the 
                                 // the scheduele array

  module.exports.createSchedule = function(req, res, next) {
    // var valid = req.body.slot1 && Validations.isString(req.body.slot1)
  
    // if (!valid) {
    //   return res.status(422).json({
    //     err: null,
    //     msg:
    //       'slot1(String) is a required field.',
    //     data: null
    //   });
    // }
    User.findById(req.decodedToken.user._id).exec(function(err, user) { // checks if the user is created within the database by decoding the 
    //JWT and checking the user id from the token. Then executes the rollback function
      if (err) {
        return next(err);
      }
      if (!user) { // if the user isn't found within the database
        return res
          .status(404)
          .json({ err: null, msg: 'User not found.', data: null });
      }
      var sched = user.schedule.create(req.body); // creates a variable called sched, user.schedule is requried as the schedule array 
                                                  // is different for each user 
      user.schedule.push(sched); // the push functions adds the sched variable in schedule array
      user.save(function(err) { // uses the callback function of an error occurs during the operation 
        if (err) {
          return next(err); 
        }
        res.status(200).json({
          err: null,
          msg: 'Schedule was created successfully.',
          data: sched
        });
      });
    });
  };
  
  module.exports.getMySchedules = function(req, res, next) {
    User.findById(req.decodedToken.user._id).exec(function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(404)
          .json({ err: null, msg: 'User not found.', data: null });
      }
      res.status(200).json({
        err: null,
        msg: 'Schedules retrieved successfully.',
        data: user.schedule
      });
    });
  };
  
  module.exports.deleteSchedule = function(req, res, next) {
    if (!Validations.isObjectId(req.params.schedId)) { // checks that the schedule ID is a valid object using the isObjectId method in validations
      return res.status(422).json({
        err: null,
        msg: 'schedId parameter must be a valid ObjectId.',
        data: null
      });
    }
    User.findById(req.decodedToken.user._id).exec(function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(404)
          .json({ err: null, msg: 'User not found.', data: null });
      }
      var sched = user.schedule.id(req.params.schedId); // the variable sched is a schedule that is located using the schedule ID 
                                                        // passed in the http request paramaters
      if (!sched) { // if the schedule is not found in the schedule array
        return res
          .status(404)
          .json({ err: null, msg: 'Schedule not found.', data: null });
      }
      sched.remove(); // removes/deletes the sched variable from the schedule array
      user.save(function(err) {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          err: null,
          msg: 'Schedule was deleted successfully.',
          data: sched
        });
      });
    });
  };
  
  module.exports.getSchedule = function(req, res, next) {
    if (!Validations.isObjectId(req.params.schedId)) {
      return res.status(422).json({
        err: null,
        msg: 'schedId parameter must be a valid ObjectId.',
        data: null
      });
    }
    User.findById(req.decodedToken.user._id).exec(function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(404)
          .json({ err: null, msg: 'User not found.', data: null });
      }
  
      var sched = user.schedule.id(req.params.schedId);
      if (!sched) {
        return res
          .status(404)
          .json({ err: null, msg: 'Schedule not found.', data: null });
      }
  
      res.status(200).json({
        err: null,
        msg: 'Schedule retrieved successfully.',
        data: sched
      });
    });
  };

  module.exports.updateSchedule = function(req, res, next) {
    if (!Validations.isObjectId(req.params.schedId)) {
      return res.status(422).json({
        err: null,
        msg: 'schedId parameter must be a valid ObjectId.',
        data: null
      });
    }
    User.findById(req.decodedToken.user._id).exec(function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(404)
          .json({ err: null, msg: 'User not found.', data: null });
      }
      var sched = user.schedule.id(req.params.schedId);
      if (!sched) {
        return res
          .status(404)
          .json({ err: null, msg: 'schedule not found.', data: null });
      }
      // updates each slot in the sched variable in the schedule array using the corresponding slot in the http request body 
      sched.slot1 = req.body.slot1; 
      sched.slot2 = req.body.slot2;
      sched.slot3 = req.body.slot3;
      sched.slot4 = req.body.slot4;
      sched.slot5 = req.body.slot5;
      sched.updatedAt = moment().toDate();

      user.save(function(err) {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          err: null,
          msg: 'schedule was updated successfully.',
          data: sched
        });
      });
    });
  };
