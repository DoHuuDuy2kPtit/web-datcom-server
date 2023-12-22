const exampleService = require('../../services/example');

const getExample = async (req, res) => {
  const responseData = await exampleService.getExample();
  return res.status(201).send(responseData);
}

module.exports = getExample;