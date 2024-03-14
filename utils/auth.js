const withAuths = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login.js');
    } else {
      next();
    }
  };
  
module.exports = withAuths;
  