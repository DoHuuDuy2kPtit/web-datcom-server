const orderService = require('../../services/order');

const getOrder = async (req, res) => {
  try {
    const responseData = await orderService.getOrder({});
    return res.status(201).send(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

module.exports = getOrder;
