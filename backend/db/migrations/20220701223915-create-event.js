'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Groups'
        },
        onDelete: 'cascade'
      },
      venueId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Venues'
        },
        onDelete: 'cascade'
        
      },
      name: {
        type: Sequelize.STRING(1000), 
        allowNull: false,
        unique: true,
      },
      type: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(1000),
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      numAttending: {
        type: Sequelize.INTEGER,
      },
      previewImage: {
        type: Sequelize.STRING(1000),
        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};