const express = require('express');

const controller = require('../Controllers/UserController');


const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/NewUser', controller.postData);

router.put('/:id', controller.update);

module.exports = router;