const router = require('express').Router();
let User = require('../models/user.model');

// handles GET requests
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// handles POST requests, breaking down three fields 
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const tickets = req.body.tickets;

  // gets username, and creates a new instance of User
  const newUser = new User({
    username,
    password,
    tickets,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// updates an existing destination item
router.route('/update/:id').post((req, res) => {
  // retrieving old destination item
  User.findById(req.params.id)

      // updating the destination to what is in the request body
      .then(user => {
          user.tickets = req.body.tickets;

          // saves the updated destination to the database
          user.save()
              .then(() => res.json('Tickets booked!'))
              .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;