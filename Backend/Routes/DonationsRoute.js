const express = require('express');

const controller = require('../Controllers/DonationController');


const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/NewDonation', controller.postData);

router.put('/:id', controller.update);

module.exports = router;