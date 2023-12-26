const foodService = require('../../services/food');

const patchFood = async (req, res) => {
  const { idFood } = req.params;
  const { idMenu, foodName, price, img } = req.body;
  const responseData = await foodService.patchFood({
    idFood,
    foodName,
    price,
  });
  return res.status(201).send(responseData);
};

module.exports = patchFood;
