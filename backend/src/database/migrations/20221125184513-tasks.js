'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return(queryInterface.createTable('tasks',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'user_id'
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100),
        field: 'title',
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(1000),
        field: 'description',
      },
    }))
  },

  async down (queryInterface, _Sequelize) {
    return queryInterface.dropTable('users');
  }
};
