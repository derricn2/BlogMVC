const router = require('express').Router();
const { Post, User } = require('../models');

// route to view dashboard with user's posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User }],
        });

        // render dashboard template with user posts
        res.render('dashboard', {
            posts: postData.map((post) => post.get({ plain: true })),
        });
        } catch (err) {
            res.status(500).json(err);
        }
    });
// route to add new post
router.get('/new', (req, res) => {
    res.render('new-post');
});

// route to edit post
router.get('/edit/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if(!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        // render edit post template with post data
        res.render('edit-post', {
            post: postData.get({ plain: true }),
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;