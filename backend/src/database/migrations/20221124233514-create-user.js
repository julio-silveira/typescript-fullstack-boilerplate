'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return(queryInterface.createTable('users',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'username',
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'password',
      },
    }))
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
