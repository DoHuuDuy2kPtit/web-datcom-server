const express = require('express');

const router = express.Router();
const { order: orderController } = require('../http/controllers');

router.post('/order', orderController.postOrder);
router.get('/order', orderController.getOrder);
router.patch('/order/:idUser', orderController.patchOrder);

module.exports = router;
