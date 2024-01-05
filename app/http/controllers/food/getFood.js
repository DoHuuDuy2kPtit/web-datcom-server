const foodService = require('../../services/food');

const getFood = async (req, res) => {
  try {
    const { idMenu } = req.params;
    const responseData = await foodService.getFood({ idMenu });
    return res.status(201).send(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

module.exports = getFood;
