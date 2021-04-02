'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderId: {
        type: Sequelize.INTEGER,
        // reference: {
        //   model: 'Orders',
        //   key: 'id'
        // }
      },
      FoodId: {
        type: Sequelize.INTEGER,
        // reference: {
        //   model: 'Foods',
        //   key: 'id'
        // }
      },
      OrderId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Orders',
          key: 'id'
        }
      },
      price: { type: Sequelize.INTEGER },
      quantity: { type: Sequelize.INTEGER },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrderItems');
  }
};
