const { Model } = require("objection");

class Hosts extends Model {
  static get tableName() {
    return "hosts";
  }
}

module.exports = Hosts;
