const express = require('express');

const router = express.Router();
const { order: orderController } = require('../http/controllers');

router.post('/order', orderController.postOrder);

module.exports = router;
