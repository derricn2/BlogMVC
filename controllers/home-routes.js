const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// home route displaying existing blog posts
router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
        });
        
        // render homepage template with blog posts
        res.render('homepage', {
            posts: postData.map((post) => post.get({ plain: true })),
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// single blog post with comments route
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment, include: [User] }],
        });

        if(!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        // render single post template with post data
        res.render('single-post', {
            post: postData.get({ plain: true }),
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;