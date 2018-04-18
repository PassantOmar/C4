var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/validations'),
  User = mongoose.model('User');
  Items = mongoose.model('items');

 module.exports.createItem = function(req, res, next){
  const valid =
    req.body.name &&
    Validations.isString(req.body.name) &&
    req.body.type &&
    Validations.isString(req.body.type) &&
    req.body.description &&
    Validations.isString(req.body.description) //Checks that the inputs are of valid types  
    if (!valid) {
      return res.status(422).json({
        err: null,
        msg: 'name(String) and price(Number) and type(String) and description(String) are required fields.',
        data: null
    });
  }
  delete req.body.createdAt;
  delete req.body.updatedAt;
  

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
      var Item = user.item.create(req.body); // creates a variable called item, user.item is requried as the item array
                                                  // is different for each user
      user.item.push(Item); // the push functions adds the item variable in item array
      user.save(function(err) { // uses the callback function of an error occurs during the operation
        if (err) {
          return next(err);
        }
        Items.create(req.body, function(err, newItem) {
          if (err) {
            return next(err);
          }
      });
        res.status(200).json({ //item addition was successful
          err: null,
          msg: 'Item was created successfully.',
          data: Item
        });
      });
    });
  };

module.exports.getItems = function(req, res, next){ //retrieves items belonging to this user
  User.findById(req.decodedToken.user._id).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) { //user was't found in the database
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    res.status(200).json({ 
      err: null,
      msg: 'Items retrieved successfully.',
      data: user.item
    });
  });
};
module.exports.getAllItems = function(req, res, next){ //retrieves all items
  User.findById(req.decodedToken.user._id).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) { //user was't found in the database
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    Items.find(req.body,function(err,items){
      if (err) {
        return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Items retrieved successfully.',
      data: items
    });
  }).exec();
  });
};

module.exports.deleteItem = function (req, res, next){
  if (!Validations.isObjectId(req.params.itemId)) { //Makes sure the item ID is a valid one
    return res.status(422).json({
      err: null,
      msg: 'ItemId parameter must be a valid ObjectId.',
      data: null
    });
  }
  User.findById(req.decodedToken.user._id).exec(function(err, user) { // checks if the user is created within the database by decoding the
    //JWT and checking the user id from the token. Then executes the rollback function
    if (err) {
      return next(err);
    }
    if (!user) { //if the user wasn't found
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    var Item = user.item.id(req.params.itemId); // the variable item is an item that is located using the item ID
                                                      // passed in the http request paramaters
    if (!Item) { // if the item is not found in the item array
      return res
        .status(404)
        .json({ err: null, msg: 'Item not found.', data: null });
    }
    Item.remove(); // removes/deletes the item variable from the item array
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      // Items.findByIdAndRemove(req.params.itemId,function(err,newitem){
      //   if (!newitem) {
      //     return res
      //       .status(404)
      //       .json({ err: null, msg: 'Item not found.', data: null });
      //   }
      // });
      res.status(200).json({
        err: null,
        msg: 'Item was deleted successfully.',
        data: Item
      });
    });
  });
};
module.exports.updateItem = function(req, res, next){
  if (!Validations.isObjectId(req.params.itemId)) { //Makes sure the item ID is a valid one
    return res.status(422).json({
      err: null,
      msg: 'ItemId parameter must be a valid ObjectId.',
      data: null
    });
  }
  User.findById(req.decodedToken.user._id).exec(function(err, user) { // checks if the user is created within the database by decoding the
    //JWT and checking the user id from the token. Then executes the rollback function
    if (err) {
      return next(err);
    }
    if (!user) { //if the user wasn't found
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    var Item = user.item.id(req.params.itemId);
    if (!Item) { //if the item wasn't found
      return res
        .status(404)
        .json({ err: null, msg: 'item not found.', data: null });
    }
  const valid =
    req.body.name &&
    Validations.isString(req.body.name) &&
    req.body.type &&
    Validations.isString(req.body.type) &&
    req.body.description &&
    Validations.isString(req.body.description); //makes sure inputs are of valid types

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) and price(Number) and type(String) and description(string)are required fields.',
      data: null
    });
  }
  Item.name = req.body.name;
  Item.price = req.body.price;
  Item.type = req.body.type;
  Item.description = req.body.description;
  Item.updatedAt = moment().toDate(); //inserts this moments' date as the updatedAt date

  // Security Check
  delete req.body.createdAt;

  user.save(function(err) { // saves new item edit to the user
    if (err) {
      return next(err);
    }
        //xxxxxx

    res.status(200).json({
      err: null,
      msg: 'Item was updated successfully.',
      data: Item
    });
  });
});
};
module.exports.updateLikes = function(req, res, next){ //Controls the incrementation of likes according to people showing interest in the item
  if (!Validations.isObjectId(req.params.itemId)) { //makes sure item ID is valid
    return res.status(422).json({
      err: null,
      msg: 'ItemId parameter must be a valid ObjectId.',
      data: null
    });
  }
  // Security Check
  delete req.body.createdAt;
  delete req.body.updatedAt;

  User.findById(req.decodedToken.user._id).exec(function(err, user) { // checks if the user is created within the database by decoding the
    //JWT and checking the user id from the token. Then executes the rollback function
    if (err) {
      return next(err);
    }
    if (!user) { //if user wasn't found
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }
    var Item = user.item.id(req.params.itemId);
    if (!Item) { //didn't find this item
      return res
        .status(404)
        .json({ err: null, msg: 'item not found.', data: null });
    }
    Item.likes = req.body.likes

  user.save(function(err) { //saves new updates to user
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Item was updated successfully.',
      data: Item
    });
  });
});
};
