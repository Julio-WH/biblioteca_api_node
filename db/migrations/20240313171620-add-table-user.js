'use strict';

const {USER_TABLE,UserSchema} = require("../models/user.model")
const { encrypt } = require('../../helpers/handleBcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    const hashedPassword = await encrypt('cambiar123');
    const today = new Date(); // Obtiene la fecha y hora actual
    const createdAt = today.toISOString(); // Convierte la fecha y hora actual a una cadena ISO8601

    await queryInterface.bulkInsert(USER_TABLE,[{username: 'admin', password: hashedPassword, role: 'admin',createdAt:createdAt,updatedAt:createdAt}]);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
