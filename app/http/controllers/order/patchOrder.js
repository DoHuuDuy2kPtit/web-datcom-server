const orderService = require('../../services/order');

const patchOrder = async (req, res) => {
  const { idUser } = req.params;
  try {
    const responseData = await orderService.patchOrder(idUser);
    return res.status(201).send(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

module.exports = patchOrder;
