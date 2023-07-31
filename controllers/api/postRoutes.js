const router = require('express').Router();
const { Post } = require('../../models');

// route to create new blog post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to update blog post
router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.sesssion.user_id,
            },
        });

        if (!postData[0]) {
            res.status(4040).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to delete post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;