const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { smartTrim } = require('../../helpers/blog');
const slugify = require('slugify');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

//@route POST api/posts
//@desc Create post
//@access Private
router.post(
  '/',
  auth,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error', err);
        throw err;
      }
      // console.log('Fields', fields);
      // console.log('Files', files);
      // for (const file of Object.entries(files)) {
      //   console.log(file);
      // }
      const { title, text, categories } = fields;
      let arrayOfCategories = categories && categories.split(',');

      if (!title || !title.length) {
        return res.status(400).json({
          error: 'Title is required',
        });
      }

      if (!text || !text.length) {
        return res.status(400).json({
          error: 'Body is required',
        });
      }
      if (!categories || categories.length === 0) {
        return res.status(400).json({
          error: 'At least one category is required',
        });
      }
      try {
        const post = new Post({
          title,
          text,
          categories: arrayOfCategories,
          slug: slugify(title).toLowerCase(),
          excerpt: smartTrim(text, 320, ' ', '...'),
        });

        if (files.image) {
          if (files.image.size > 10000000) {
            return res.status(400).json({
              error: 'Image must not be bigger than 1MB',
            });
          }
          post.image.data = fs.readFileSync(files.image.path);
          post.image.contentType = files.image.type;
        }
        await post.save();
        res.json(post);
        // const slug = post.slug;
        // console.log(post.slug);
        // async function updateCat(slug) {
        //   const post = await Post.update(
        //     { slug },
        //     { $push: { categories: arrayOfCategories } }
        //   );
        //   res.send(post);
        //   console.log(post);
        // }
        // postTo.categories.push(arrayOfCategories);
      } catch (err) {
        console.error(err.message);
        res.status(400).send('Server error');
      }
    });
  }
);

//@route GET api/posts/:slug
//@desc Update post
//@access Private

router.put('/:slug', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let post = await Post.findOne({ slug: req.params.slug });

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: 'Image could not upload',
        });
      }

      post = _.merge(post, fields);
      const { text, categories, title } = fields;

      post.categories = categories.split(',');
      post.slug = slugify(title).toLowerCase();
      post.excerpt = smartTrim(text, 320, ' ', '...');

      if (files.image) {
        if (files.image.size > 10000000) {
          return res.status(400).json({
            error: 'Image must not be bigger than 1MB',
          });
        }
        post.image.data = fs.readFileSync(files.image.path);
        post.image.contentType = files.image.type;
      }
      await post.save();
      return res.json(post);
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

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
      '_id name slug'
    );

    if (!post) {
      return res.status(404).json({
        msg: 'Post not found',
      });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Post not found',
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
    const posts = await Post.find().sort({ date: -1 }).select('-text');
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
        msg: 'Post not found',
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
        msg: 'Post not found',
      });
    }
    res.status(400).send('Server error');
  }
});

//@route GET api/posts/category/:id
//@desc   Get posts by cat id
//@access Public
router.get('/category/:id', async (req, res) => {
  try {
    const posts = await Post.find({ categories: { _id: req.params.id } })
      .sort({ date: -1 })
      .select('-text');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

// GET /api/posts/realated
// get related articles
router.post('/related', async (req, res) => {
  //console.log(req.body.post);
  const { _id, categories } = req.body.postFromPost;
  try {
    const posts = await Post.find({
      _id: { $ne: _id },
      categories: { $in: categories },
    })
      .sort({ date: -1 })
      .select('-text');
    res.json(posts);
    console.log(_id);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

//@route GET api/posts/image/:slug
//@desc  Get post image
//@access Private

router.get('/image/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).select('image');
    res.set('Content-Type', post.image.contentType);
    return res.send(post.image.data);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

//@route PUT api/posts/categories
//@desc Add categories to post
//@access Private

// router.put('/posts/categories', auth, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { checkedCategories, slug } = req.body;
//   const newCategories = checkedCategories;

//   try {
//     const post = await Post.findOne({ slug });

//     post.categories.unshift(newCategories);
//     await post.save();
//     res.jsson(post);
//   } catch (err) {
//     console.error(err.message);
//     res.status(400).send('Server error');
//   }
// });

// old update route

// router.put(
//   '/:slug',
//     auth,
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { title, text, categories } = req.body;

//     try {
//       // let post = await Post.findOne({ slug: req.params.slug });

//       let post = await Post.findOneAndUpdate(
//         { slug: req.params.slug },
//         {
//           $set: {
//             title,
//             text,
//             excerpt: smartTrim(text, 320, ' ', '...'),
//             categories,
//           },
//         },
//         { new: true }
//       );
//       return res.json(post);
//     } catch (err) {
//       console.error(err.message);
//       res.status(400).send('Server error');
//     }
//   }
// );

module.exports = router;
