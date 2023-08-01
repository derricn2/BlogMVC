const router = require('express').Router();
const { Post } = require('../../models');

// route to create new blog post
router.post('/', async (req, res) => {
    try {
      // get the logged-in user's ID from the session
      const { user_id } = req.session;
  
      // ensure that user_id is not null
      if (!user_id) {
        return res.status(401).json({ message: 'You must be logged in to create a post.' });
      }

      console.log('Post Data:', req.body); // check if the post data is being received correctly

      // create the new post with the user_id
      const postData = await Post.create({
        ...req.body,
        user_id: user_id,
      });
  
      console.log('New Post:', postData); // Check the newly created post data

      // redirect to the dashboard after successful post creation
      res.redirect('/dashboard');
    } catch (err) {
      console.error('Error creating post:', err);
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