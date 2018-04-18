const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const activitySchema = mongoose.Schema({

  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  score: {
    type: Number,
    min: 0,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  creator: {
   type: Schema.Types.ObjectId, 
   ref: 'User'
 },
 intrestedUsers: [ { 
   type: Schema.Types.ObjectId, 
   ref: 'User' 
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

mongoose.model('Activity', activitySchema);
