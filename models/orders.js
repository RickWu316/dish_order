'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orders.hasMany(models.OrderItems)
      // define association here
    }
  };
  Orders.init({
    name: DataTypes.STRING,
    amount: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.NUMBER,
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};
