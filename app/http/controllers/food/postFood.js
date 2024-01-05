const foodService = require('../../services/food');

const postFood = async (req, res) => {
  try {
    const { idMenu, foodName, price, img } = req.body;
    const responseData = await foodService.postFood({
      idMenu,
      foodName,
      price,
      img,
    });
    return res.status(201).send(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

module.exports = postFood;
