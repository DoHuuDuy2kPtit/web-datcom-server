const express = require('express');

const router = express.Router();
const { food: foodController } = require('../http/controllers');

router.get('/food', foodController.getFood);
router.post('/food', foodController.postFood);
router.delete('/food/:idFood', foodController.deleteFood);
router.patch('/food/:idFood', foodController.patchFood);
module.exports = router;
