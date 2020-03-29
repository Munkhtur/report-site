const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { smartTrim } = require('../../helpers/blog');
const slugify = require('slugify');

//@route POST api/posts
//@desc Create post
//@access Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('text', 'Body is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, text, categories } = req.body;

    try {
      const post = new Post({
        title,
        slug: slugify(title).toLowerCase(),
        text,
        excerpt: smartTrim(text, 320, ' ', '...'),
        categories
      });

      await post.save();
      res.send(post);
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Server error');
    }
  }
);

//@route GET api/posts
//@desc Get all posts
//@access Public

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

//@route GET api/posts/:id
//@desc Get a single post by id
//@access Public

router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      'categories',
      'name slug'
    );

    if (!post) {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }
    res.status(400).send('Server error');
  }
});

//@route Get api/posts/list
//@desc Get Post list
//@access Public
router.get('/list/titles', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .select('-text');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

//@route DELETE api/posts/:id
//@desc Delete a post
//@access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }

    //check user
    // if (post.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'User not authorized' });
    // }
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }
    res.status(400).send('Server error');
  }
});

module.exports = router;
