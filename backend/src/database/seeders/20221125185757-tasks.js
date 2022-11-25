'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'tasks', [
        {
          userId: 1,
          title: 'text01',
          description: 'task01',

        },
        {
          userId: 1,
          title: 'text02',
          description: 'task02',

        },
        {
          userId: 2,
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