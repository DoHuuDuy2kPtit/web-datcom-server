const orderService = require('../../services/order');

const postOrder = async (req, res) => {
  try {
    const { idMenu, idUser, idFood, quantity, totalPrice, status } = req.body;
    const responseData = await orderService.postOrder({
      idMenu,
      idUser,
      idFood,
      quantity,
      totalPrice,
      status,
    });
    return res.status(201).send(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

module.exports = postOrder;
