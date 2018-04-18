const mongoose = require('mongoose');


var ScheduleSchema = mongoose.Schema({
  slot1: {
    type: String,
    required: false,
    default: 'Empty Slot'
  },
  slot2: {
    type: String,
    required: false
  },
  slot3: {
    type: String,
    required: false
  },
  slot4: {
    type: String,
    required: false
  },
  slot5: {
    type: String,
    required: false
  },
  createdAt: {
  type: Date,
  default: Date.now
    },
  updatedAt: Date
});
var PostItemsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: false, //Not required as the user could choose that the item is for free
  },
  type: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  likes: { //Way of showing interest in items
    type: Number,
    required: false,
    default: 0 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt:  Date
});

const UserSchema = mongoose.Schema({
  username: {//unique
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: false,//not required
    min: 5 // minimum age of users will be 5
  },
  location: {
    type: String,
    required: false,//not required
    trim: true,
    lowercase: true
  },
  educationalSystem: {
    type: String,
    required: false,// you can add it later after regitering
    trim: true,
    lowercase: true
  },
  role: {// changed from type
    type: String,
    required: false,// it is not required because it is set by the admin
    trim: true,
    lowercase: true,
    default: 'normal'// normal user --limited functionality
  },
  childScore: {
    type: Number,
    required: false,
    trim: true,
    default: 0 // it is an attribute and edited field by users
  },
  parent: {// all the users will have the parent field empty
    //unless he/she is a child
    //and it will contain parent's username
    type: String,
    required: false,
    trim: true
  },

    subject: { // if he is ateacher
      type: String,
      required: false,
      trim: true
    },
    yearsofexperience: {// if he is a teacher
      type: Number,
      required: false,
      trim: true
    },
    teacherReq: { //the teacher request when = 1 a request has already been submitted.
      type: Number,
      required: false,
      default: 0

    },
    schedule: [ScheduleSchema], // the user document will have an array of schedule subdocument.
                               //type ScheduleSchema which is the schema created above the user schema
    item: [PostItemsSchema]
  });


mongoose.model('User', UserSchema);
