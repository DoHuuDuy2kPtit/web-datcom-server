const foodService = require('../../services/food');

const patchFood = async (req, res) => {
  try {
    const { idFood } = req.params;
    const { foodName, price } = req.body;
    const responseData = await foodService.patchFood({
      idFood,
      foodName,
      price,
    });
    return res.status(201).send(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

module.exports = patchFood;
