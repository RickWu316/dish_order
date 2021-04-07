'use strict';

const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Foods = Array.from({ length: 10 }).map((item, index) =>
    ({
      name: faker.name.findName(),
      price: Math.floor(Math.random() * 100),
      description: faker.datatype.string(),
      image: "https://picsum.photos/200",
      createdAt: new Date(),
      updatedAt: new Date()

    })
    )

    return queryInterface.bulkInsert('Foods', Foods)

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Foods', null, {})

  }
};
