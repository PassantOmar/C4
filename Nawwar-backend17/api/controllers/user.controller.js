var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/validations'),
  User = mongoose.model('User'),
  Activity = mongoose.model('Activity');

module.exports.updateuserrole = async (req, res) => {

  const valid =
    req.body.role &&
    Validations.isString(req.body.role) ;
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'nrole is a required field',
      data: null
    });
  }
  // Security Check
  delete req.body.createdAt;
  req.body.updatedAt = moment().toDate();

  const updatedProduct = await User.findByIdAndUpdate(
      req.decodedToken.user._id,
      {
        $set: req.body
      },
      { new: true }
    ).exec();
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'User was updated successfully.',
      data: updatedProduct
    });
  };

module.exports.newTeacherRequest = function(req, res, next) {
  // var valid =
  // req.body.teacherReq &&
  // Validations.isNumber (req.body.teacherReq);
  //
  // console.log(req.body.teacherReq);
  // console.log(Validations.isNumber (req.body.teacherReq));
  //
  // if(!valid){
  //   return res.status(422).json({
  //     err: null,
  //     msg: 'teacherReq is a required fields.',
  //     data: null
  //   });
  // }
  User.findById(req.decodedToken.user._id).exec(function(err, user){
    if(err){
      return next(err);
    }
    if(!user) {
      return res.status(404).json({
        err: null,
        msg: 'User not found.',
        data: null
      });
    }

    user.teacherReq = 1;

    user.save(function(err) {
      if(err){
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'user was updated successfully.',
        data: user
      });
    });
  });
};

module.exports.getAllMyData = function(req, res, next){
  User.findById(req.decodedToken.user._id).exec(function(err, user){
    if(err){
      return next(err);
    }
    if(!user) {
      return res.status(404).json({
        err: null,
        msg: 'User not found.',
        data: null
      });
    }
    res.status(200).json({
      err: null,
      msg: 'user data was retrieved successfully.',
      data: user
    });

  });
};

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find({}).exec();
  res.status(200).json({
    err: null,
    msg: 'Users retrieved successfully.',
    data: users
  });
};
