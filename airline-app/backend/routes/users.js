const router = require('express').Router();
let User = require('../models/user.model');

// handles GET requsts 
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// handles POST requests 
router.route('/add').post((req, res) => {
  const username = req.body.username;

  // gets username, and creates a new instance of User
  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;