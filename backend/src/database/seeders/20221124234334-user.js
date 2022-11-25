'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users', [
        {
          username: 'user01',
          password: '1234',
        },
        {
          username: 'user02',
          password: '4321'
        }
      ]
    )
  },

  down: async (queryInterface) => {
   await queryInterface.bulkDelete('books', null, {});
  },
};
