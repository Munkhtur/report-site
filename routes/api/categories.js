const slugify = require('slugify')
const Category = require('../../models/Category')
const Post = require('../../models/Post')
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

//@route POST api/category
//@desc Create category
//@access Private

router.post('/', [auth, check('name', 'Name is required').not().isEmpty()], async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {name } = req.body
    const slug = slugify(name).toLowerCase()
    try {
        const category = new Category({name, slug})

        await category.save()
        res.send(category)
    } catch (err) {
        console.error(err.message);
    res.status(400).send('Server error');
    }
})

//@route GET api/categories
//@desc  Get all categories
//@access Private

router.get('/', auth, async (req, res)=>{
    try {
        const categories = await Category.find({})
        res.json(categories)
    } catch (err) {
        console.error(err.message);
    res.status(400).send('Server error');
    }
})

//@route GET api/category by id and posts 
//@desc  Get a category and its posts
//@access Private

router.get('/:id', auth, async (req, res)=>{
    try {
        const category = await Category.findById(req.params.id)
        if(!category){
            return res.status(404).json({
                msg: 'Category not found'
              });
        }
        const posts = await Post.find({categories: category}).populate('categories', ' slug, name').select('title excerpt text date')
        res.json({category, posts})
    } catch (err) {
        console.error(err.message);
    res.status(400).send('Server error');
    }
})

//@route DELETE api/categories/:id 
//@desc  delete category 
//@access Private

router.delete('/:id', auth, async (req, res)=>{
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({
              msg: 'Category not found'
            });
          }
        await category.remove()
        res.json({ msg: 'Category removed' });
    } catch (err) {
        console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Category not found'
      });
    }
    }
})

module.exports = router

