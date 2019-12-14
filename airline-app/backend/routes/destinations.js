const router = require('express').Router();
let Destination = require('../models/destination.model');

// GET
router.route('/').get((req, res) => {
    Destination.find()
    .then(destinations => res.json(destinations))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST 
// breaks all four fields from the data 
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const from = req.body.from;
    const to = req.body.to;
    const departDate = req.body.departDate;
    const returnDate = req.body.returnDate;
    const price = Number(req.body.price);
    const amount = Number(req.body.amount);

    // gets the destination data, and creates a new Destination 
    const newDestination = new Destination({
        username,
        from, 
        to, 
        departDate, 
        returnDate, 
        price,
        amount,
    });

    newDestination.save()
    .then(() => res.json('Destination added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// returning a destination item given an id
router.route('/:id').get((req, res) => {
    Destination.findById(req.params.id)
    .then(destination => res.json(destination))
    .catch(err => res.status(400).json('Error: ' + err));
});

// deletes a destination item given an id 
router.route('/:id').delete((req, res) => {
    Destination.findByIdAndDelete(req.params.id)
    .then(() => res.json('Destination deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// updates an existing destination item
router.route('/update/:id').post((req, res) => {
    // retrieving old destination item
    Destination.findById(req.params.id)

        // updating the destination to what is in the request body
        .then(destination => {
            destination.username = req.body.username;
            destination.from = req.body.from;
            destination.to = req.body.to;
            destination.departDate = Date.parse(req.body.departDate);
            destination.returnDate = Date.parse(req.body.returnDate);
            destination.price = Number(req.body.price);
            destination.amount = Number(req.body.amount);

            // saves the updated destination to the database
            destination.save()
                .then(() => res.json('Destination updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;