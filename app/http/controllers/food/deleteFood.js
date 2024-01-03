const foodService = require('../../services/food');

const deleteFood = async (req, res) => {
  try {
    const { idFood } = req.params;
    const responseData = await foodService.deleteFood(idFood);
    return res.status(201).send(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

module.exports = deleteFood;
