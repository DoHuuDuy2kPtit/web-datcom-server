const foodService = require('../../services/food');

const postFood = async (req, res) => {
  const { idMenu, foodName, price, img } = req.body;
  const responseData = await foodService.postFood({
    idMenu,
    foodName,
    price,
    img,
  });
  return res.status(201).send(responseData);
};

module.exports = postFood;
