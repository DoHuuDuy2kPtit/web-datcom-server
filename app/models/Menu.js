const { Model } = require('objection');

class Menu extends Model {
  static get tableName() {
    return 'menu';
  }
}

module.exports = Menu;
