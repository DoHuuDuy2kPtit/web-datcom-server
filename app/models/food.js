const { Model } = require('objection');

class Food extends Model {
  static get tableName() {
    return 'foods';
  }
}

module.exports = Food;
