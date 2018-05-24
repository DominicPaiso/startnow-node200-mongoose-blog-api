const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => { 
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req, res) => {
    Blog
        .where('featured')
        .equals(true)
        .then(blogs => { 
            res.status(200).json(blogs);
        });
});

router.get('/:id', (req,res) => {
    Blog
        .findById(req.params.id)
        .then(blog => {
            blog ? res.status(200).json(blog) : res.status(404).send('404 not found')
        });
});

// router.post('/', (req, res) => {
//     const newBlog = new Blog(req.body);
//     newBlog.save()
//     .then(blog => {
//         res.status(201).json(blog);
//     });
// });

router.post('/', (req, res) => {  
    let dbUser = null;
    User
        .findById(req.body.authorId)
        .then(user => { 
            dbUser = user;
            const newBlog = new Blog(req.body);
            newBlog.author = user._id;
            return newBlog.save();
        })
        .then(blog => { 
            dbUser.blogs.push(blog);
            dbUser.save().then(() => res.status(201).json(blog))
        });
});

router.put('/:id', (req, res) => { 
    Blog
        .findByIdAndUpdate(req.params.id, {$set: req.body})
        .then(blogs => { 
            res.status(204).json(blogs);
        });
});

router.delete('/:id', (req, res) => {
    Blog   
        .findByIdAndRemove(req.params.id)
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

module.exports = router;