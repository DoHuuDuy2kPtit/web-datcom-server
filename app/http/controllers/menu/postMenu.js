const MenuService = require('../../services/menu');

const postMenu = async (req, res) => {
  try {
    const { idHost } = req.body;
    const responseData = await MenuService.postMenu(idHost);
    return res.status(201).send(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

module.exports = postMenu;
