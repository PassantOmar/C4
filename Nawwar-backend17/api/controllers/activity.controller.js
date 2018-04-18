var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/validations'),
  User = mongoose.model('User'),
  Activity = mongoose.model('Activity');

  module.exports.createNewActivity = async (req, res) => {

    /* Activities are created by users and shared and any user can see them
      the required fields when creating any activity are the name, price and score
      the creator is determined from the token sent by the create request.
      ALSO AN IMPORTANT NOTE IS THE NAME OF EACH ACTIVITY SHOULD DIFFERENT.
    */

    const valid =
    req.body.name &&
    Validations.isString (req.body.name) &&
    req.body.score &&
    Validations.isNumber (req.body.score)
    req.body.price &&
    Validations.isNumber (req.body.price);
    
    if(!valid){
      return res.status(422).json({
        err: null,
        msg: 'Name, score and price are required fields.',
        data: null
      });
    }
    console.log('test1');
  
    const user = await User.findById(req.decodedToken.user._id).exec();
    if(!user) {
      return res.status(404).json({
        err: null,
        msg: 'User not found.',
        data: null
      });
    }
    console.log('test2');
    
    const checkAct = await Activity.findOne({ // making sure the activity name wasnt used before.
      name: req.body.name.trim().toLowerCase() }).exec();
    if(checkAct){
      return res.status(422).json({
        err: null,
        msg:
          'An Activity with this name already exists, please try another name.',
        data: null
      });
    }
  
    req.body.creator = req.decodedToken.user._id; // setting the user that sent the created request as the creator.
    const activity = await Activity.create(req.body); 
    res.status(200).json({
      err: null,
      msg: 'Activity was created successfully.',
      data: activity
    });
  };
  
  module.exports.deleteActivity= async (req, res) => {
    /**
     * This method basically deletes the activity 
     * upon reciving the _id of the activity as a 
     * parameter in the delete request.
     *
     */

    if (!Validations.isObjectId(req.params.activityId)) {
      return res.status(422).json({
        err: null,
        msg: 'activityId parameter must be a valid ObjectId.',
        data: null
      });
    }
    console.log('test1');
    const user = await User.findById(req.decodedToken.user._id).exec();
    if(!user) {
      return res.status(404).json({
        err: null,
        msg: 'User not found.',
        data: null
      });
    }
    console.log('test2');
    const deletedActivity = await Activity.findByIdAndRemove(req.params.activityId).exec();
    console.log('test3');
    if (!deletedActivity) {
      return res
        .status(404)
        .json({ err: null, msg: 'Activity not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Activity was deleted successfully.',
      data: deletedActivity
    });
  };
  
  module.exports.updateActivity = async (req, res) => {

    /** Each activity can be updated by sending the _id of the activity as a
     * parameter in the http request.
     *  price and score are the field eligible for updating by the user. 
     */

    if (!Validations.isObjectId(req.params.activityId)) {
      return res.status(422).json({
        err: null,
        msg: 'activityId parameter must be a valid ObjectId.',
        data: null
      });
    }
    const valid =
    req.body.price &&
    Validations.isNumber(req.body.price) &&
    req.body.score &&
    Validations.isNumber(req.body.score);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'Price/Score is a required field',
      data: null
    });
  }
  console.log('test1');
    // Security Check
    delete req.body.createdAt;
    req.body.updatedAt = moment().toDate();
  
    const user = await User.findById(req.decodedToken.user._id).exec();
    console.log('test2');
    if(!user) {
      return res.status(404).json({
        err: null,
        msg: 'User not found.',
        data: null
      });
    }
    console.log('test3');
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.activityId,
      {
        $set: req.body
      },
      { new: true }
    ).exec();
    if (!updatedActivity) {
      return res
        .status(404)
        .json({ err: null, msg: 'Activity not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Activity was updated successfully.',
      data: updatedActivity
    });
  };
  
  module.exports.getActivities = async (req, res) => {

    /**
     * This method retrives all of the activites available on the system to be
     * dispalyed on the activites hub on the website.
     * ALL THE INFO ABOUT THE ACTIVITY IS RETURNED IN THE RESPONSE.
     * PLUS; THE INFO ABOUT THE CREATOR OF THE ACTIVITY IN THE CREATOR ATTRIBUTE
     * ALSO, ALL THE INTRESTED USERS IN ACTIVITY THE ARE RETURNED AS AN
     * ARRAY OF USER OBJECTS THE CAN BE MANIPULATED.
     * 
     */

    const user = await User.findById(req.decodedToken.user._id).exec();
    if(!user) {
      return res.status(404).json({
        err: null,
        msg: 'User not found.',
        data: null
      });
    }

    // here all the activities are returned along with all its info
    // and the populating the user refrences of user in the
    // creator and interstedusers attributes.
    
    const activities = await Activity.find({}).populate('creator').populate('intrestedUsers')
    .exec();
    res.status(200).json({
      err: null,
      msg: 'Activity retrieved successfully.',
      data: activities
    });
  };

  module.exports.showIntrestinAct = async (req, res) =>{
    /**
     * This method basically adds the current user of the website 
     * to the array of interested users in this activity.
     * the users can be retrieved when calling the getActivities()
     * method as the users are refrenced and populated when retrieving
     * the activities.
     */
    if (!Validations.isObjectId(req.params.actvId)) {
      return res.status(422).json({
        err: null,
        msg: 'actvId parameter must be a valid ObjectId.',
        data: null
      });
    }

    const user = await User.findById(req.decodedToken.user._id).exec();
    if(!user) {
      return res.status(404).json({
        err: null,
        msg: 'User not found.',
        data: null
      });
    }
    
    const activity = await Activity.findById(req.params.actvId).exec();
    if(!activity) {
      return res.status(404).json({
        err: null,
        msg: 'activity not found.',
        data: null
      });
    }

   var done1 = await activity.intrestedUsers.push(user._id);

   if(!done1) {
    return res.status(422).json({
      err: null,
      msg: 'Unprocessable Entity, pushing user.',
      data: null
    });
   }

   var done2 = await activity.save();
   
   if(!done2) {
    return res.status(422).json({
      err: null,
      msg: 'Unprocessable Entity, saving activity.',
      data: null
    });
   }
   res.status(200).json({
    err: null,
    msg: 'Activity was updated successfully.',
    data: activity
    });
  };