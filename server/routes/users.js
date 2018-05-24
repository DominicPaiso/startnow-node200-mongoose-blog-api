const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:id', (req, res) => { 
    User
        .findById(req.params.id)
        .then(user => {
           user ? res.status(200).json(user) : res.status(404).send('404 not found')
        });
});

router.post('/', (req, res) => {
    let newUser = new User(req.body);
        newUser.save()
        .then(user => {
            res.status(201).json(user);
        });
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, { $set: req.body})
        .then(user => {
            res.status(204).json(user);
        });
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(users => {
            res.status(200).json(users);
        });
});



module.exports = router;