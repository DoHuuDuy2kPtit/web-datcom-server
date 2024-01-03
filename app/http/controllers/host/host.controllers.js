const hostsService = require("../../services/hosts.services")

const getAllHosts = async (req, res) => {
  const responseData = await hostsService.getAllHosts();
  return res.status(200).json(responseData);
};

module.exports = { getAllHosts };
