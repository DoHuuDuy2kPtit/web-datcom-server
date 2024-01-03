const express = require('express');

const router = express.Router();
const { food: foodController } = require('../http/controllers');
const { menu: menuController } = require('../http/controllers');

router.get('/food/:idMenu', foodController.getFood);
router.post('/food', foodController.postFood);
router.delete('/food/:idFood', foodController.deleteFood);
router.patch('/food/:idFood', foodController.patchFood);
//post menu
router.post('/menu', menuController.postMenu);
//search food
router.get('/search', foodController.getSearchFood);
//post img
router.post('/media', foodController.postMedia);
//Get All Host
router.get('/allHost', menuController.getAllHost);

module.exports = router;
