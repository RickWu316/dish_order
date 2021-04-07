'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: "admin",
      email: "admin@example.com",
      password: bcrypt.hashSync("admin", bcrypt.genSaltSync(10), null),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()

    }])
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {})
  }
};


