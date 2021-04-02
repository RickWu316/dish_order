'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItems.belongsTo(models.Foods)
      OrderItems.belongsTo(models.Orders)

    }
  };
  OrderItems.init({
    OrderId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItems',
  });
  return OrderItems;
};
