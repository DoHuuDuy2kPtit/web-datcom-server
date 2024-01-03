const foodService = require('../../services/food');

const deleteFood = async (req, res) => {
  const { idFood } = req.params;
  const responseData = await foodService.deleteFood(idFood);
  return res.status(201).send(responseData);
};

module.exports = deleteFood;
