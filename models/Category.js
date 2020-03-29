const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },

    slug: {
        type: String,
        unique: true,
        index: true
    },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Category = mongoose.model('category', CategorySchema);
