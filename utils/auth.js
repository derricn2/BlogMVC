const withAuth = (req, res, next) => {
      // If the user is not logged in (session's "logged_in" property is falsy),
    // redirect them to the login page
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  