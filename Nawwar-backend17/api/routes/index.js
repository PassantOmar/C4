var express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  asyncMiddleware = require('express-async-handler'),
  authCtrl = require('../controllers/auth.controller'),
  userCtrl = require('../controllers/user.controller'),
  schdCtrl = require('../controllers/schedule.controller'),
  actvCtrl = require('../controllers/activity.controller');
  itemCtrl = require('../controllers/item.controller');

var isAuthenticated = function(req, res, next) {
  // Check that the request has the JWT in the authorization header
  var token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      error: null,
      msg: 'You have to login first.',
      data: null
    });
  }
  // Verify that the JWT is created using our server secret and that it hasn't expired yet
  jwt.verify(token, req.app.get('secret'), function(err, decodedToken) {
    if (err) {
      return res.status(401).json({
        error: err,
        msg: 'Login timed out, please login again.',
        data: null
      });
    }
    req.decodedToken = decodedToken;
    next();
  });
};

var isNotAuthenticated = function(req, res, next) {
  // Check that the request doesn't have the JWT in the authorization header
  var token = req.headers['authorization'];
  if (token) {
    return res.status(403).json({
      error: null,
      msg: 'You are already logged in.',
      data: null
    });
  }
  next();
};

//-----------------------------Authentication Routes-------------------------
router.post('/auth/register', isNotAuthenticated, authCtrl.register);
router.post('/auth/login', isNotAuthenticated, authCtrl.login);

//-----------------------------User Routes-------------------------



router.get('/user/getAllUsers', isAuthenticated, asyncMiddleware(userCtrl.getAllUsers));
router.get('/user/getAllMyData', isAuthenticated, userCtrl.getAllMyData);


router.patch('/user/updateuserrole', isAuthenticated, asyncMiddleware(userCtrl.updateuserrole));
router.patch('/user/newTeacherRequest', isAuthenticated, userCtrl.newTeacherRequest);


//-----------------------------Schedule Routes-------------------------

router.post('/schedule/createSchedule', isAuthenticated, schdCtrl.createSchedule);

router.get('/schedule/getMySchedules', isAuthenticated, schdCtrl.getMySchedules);
router.get('/schedule/getSchedule/:schedId', isAuthenticated, schdCtrl.getSchedule);

router.delete('/schedule/deleteSchedule/:schedId', isAuthenticated, schdCtrl.deleteSchedule);

router.patch('/schedule/updateSchedule/:schedId', isAuthenticated, schdCtrl.updateSchedule);

//-----------------------------Activity Routes-------------------------

router.post('/activity/createNewActivity', isAuthenticated, asyncMiddleware(actvCtrl.createNewActivity));
// ^^^^^^^^^^^^^ this can be called when the user wants to create a new activity.

router.delete('/activity/deleteActivity/:activityId', isAuthenticated, asyncMiddleware(actvCtrl.deleteActivity));
// ^^^^^^^^^^^^ check the controller for a complete discription.

router.patch('/activity/updateActivity/:activityId', isAuthenticated, asyncMiddleware(actvCtrl.updateActivity));
// ^^^^^^^^^^^^^ this is called when updating an activity and the body should contain
// ^^^^^^^^^^^^^ the updated score and price of the activity.

router.get('/activity/getActivities', isAuthenticated, asyncMiddleware(actvCtrl.getActivities));
// ^^^^^^^^^^^^ check the controller for a complete discription.

router.patch('/activity/showIntrestinAct/:actvId', isAuthenticated, asyncMiddleware(actvCtrl.showIntrestinAct));
// ^^^^^^^^^^^^ check the controller for a complete discription.

//-----------------------------Items Routes-------------------------
router.post('/item/createItem', isAuthenticated, itemCtrl.createItem);
//this is called when the user wants to add a new item
router.get('/item/getItems', isAuthenticated, itemCtrl.getItems);
//this is called when the user is trying to view all created items 
router.delete('/item/deleteItem/:itemId', isAuthenticated, itemCtrl.deleteItem);
//this is called when the user wants to delete one of his items
router.patch('/item/updateItem/:itemId', isAuthenticated, itemCtrl.updateItem);
//this is called when the user wants to edit one of his items
router.patch('/item/updateLikes/:itemId', isAuthenticated, itemCtrl.updateLikes);
//this is called when one of the users shows interest in a post by pressing the like button


module.exports = router;
