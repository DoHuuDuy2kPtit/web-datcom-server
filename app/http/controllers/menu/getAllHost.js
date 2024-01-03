const MenuService = require('../../services/menu');

const getAllHost = async (req, res) => {
  try {
    const responseData = await MenuService.getAllHost();
    return res.status(201).send(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

module.exports = getAllHost;
