'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'tasks', [
        {
          user_id: 1,
          title: 'text01',
          description: 'task01',

        },
        {
          user_id: 1,
          title: 'text02',
          description: 'task02',

        },
        {
          user_id: 2,
          title: 'text03',
          description: 'task03',

        },
      ]
    )
  },

  down: async (queryInterface) => {
   await queryInterface.bulkDelete('tasks', null, {});
  },
};