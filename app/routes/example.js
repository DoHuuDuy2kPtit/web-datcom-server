const express = require('express');

const router = express.Router();
const { example: exampleController } = require('../http/controllers');

router.get('/example', exampleController.getExample);

module.exports = router;
