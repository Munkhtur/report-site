const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    index: true,
    unique: true
  },
  excerpt: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }],
  image: {
    data: Buffer,
    contentType: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
