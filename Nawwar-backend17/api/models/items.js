const mongoose = require('mongoose');

const ItemsSchema = mongoose.Schema({
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
  
  mongoose.model('items', ItemsSchema);
