const UserPost = require('../models/User');


// Example route handler to insert a new user
module.exports = async (req, res) => {
  try {
      const newUser = UserPost({
          username: req.body.username,
          password: req.body.password
      });

      await newUser.save();
      //res.status(201).send('User created successfully');
      res.redirect('/index');
  } catch (error) {
      //console.error(error);

      if (error.name === 'ValidationError') {
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
        req.flash('validationErrors',validationErrors);
        //req.session.validationErrors = validationErrors;
        return res.redirect('/register');
        }

      //res.redirect('/login');
     // res.status(500).send('An error occurred while creating the user');
  }
};