const Example = require("../../models/Example")

exports.getExample = async () => {
  const example = await Example.query().select('*');

  return example;
}