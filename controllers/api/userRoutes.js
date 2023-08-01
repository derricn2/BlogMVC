const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// route to create new user
router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // check if the username already exists in the database
      const existingUser = await User.findOne({
        where: { username },
      });
  
      if (existingUser) {
        // username is already taken
        return res.status(400).render('signup', {
            errorMessage: 'Username is already taken. Please choose a different username.',
          });
        }
  
      // create the new user
      const newUser = await User.create({ username, password });
  
      // save user id to session so user stays logged in
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        res.status(200).redirect('/dashboard'); // Redirect to the dashboard after successful signup
      });
    } catch (err) {
      // handle other errors
      console.error('Error signing up:', err);
      res.status(500).render('signup', {
        errorMessage: 'An error occurred during signup. Please try again later.',
      });
    }
  });

// route to log in
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username },
        });

        if (!userData || !userData.checkPassword(req.body.password)) {
            res.status(400).render('login', {
                errorMessage: 'Incorrect username or password', // redirect to login page with error message
            });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).redirect('/dashboard'); // redirect to the dashboard after successful login
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to log out
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      // Destroy the user's session
      req.session.destroy(() => {
        // Redirect to the homepage after logout
        res.redirect('/');
      });
    } else {
      res.status(400).json({ message: 'You are not logged in.' });
    }
  });
  

// example route that requires authentication (Dashboard route)
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // fetch data for the dashboard that requires authentication
      res.render('dashboard', { user: req.session.user_id });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;