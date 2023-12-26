const foodService = require('../../services/food');

const getFood = async (req, res) => {
  const responseData = await foodService.getFood();
  return res.status(201).send(responseData);
};

module.exports = getFood;
